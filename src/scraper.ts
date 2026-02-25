import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, Page } from 'puppeteer';
import TurndownService from 'turndown';
// @ts-ignore
import { gfm } from 'turndown-plugin-gfm';
import crypto from 'crypto';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

// Configure Turndown for better markdown output
const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
});
turndownService.use(gfm);
turndownService.addRule('codeBlocks', {
    filter: ['pre'],
    replacement: function (_content: string, node: Node) {
        const element = node as HTMLPreElement;
        const code = element.querySelector('code');
        const language = code?.className?.match(/language-(\w+)/)?.[1] || '';
        const codeContent = code?.textContent || element.textContent || '';
        return `\n\`\`\`${language}\n${codeContent}\n\`\`\`\n`;
    },
});

export interface ScrapedPage {
    url: string;
    title: string;
    markdown: string;
    hash: string;
    error?: string;
    childLinks: string[];
}

let browser: Browser | null = null;

// Add stealth plugin to bypass bot detection like Akamai
// @ts-ignore
puppeteer.use(StealthPlugin());

async function getBrowser(): Promise<Browser> {
    if (!browser) {
        // @ts-ignore
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1920,1080'],
            defaultViewport: { width: 1920, height: 1080 }
        }) as unknown as Browser;
    }
    return browser;
}

/**
 * Attempt to extract article text directly from the undocumented Aura API to bypass Akamai bot detection.
 */
async function scrapeAuraArticle(urlStr: string, baseDomain?: string): Promise<ScrapedPage | null> {
    // TEMPORARY BYPASS to force Puppeteer test
    return null;

    try {
        const url = new URL(urlStr);
        const articleId = url.searchParams.get('id');

        if (!articleId || !url.hostname.includes('help.salesforce.com') || !urlStr.includes('articleView')) {
            return null;
        }

        const payload = {
            "actions": [{
                "id": "1;a",
                "descriptor": "aura://ApexActionController/ACTION$execute",
                "callingDescriptor": "UNKNOWN",
                "params": {
                    "namespace": "",
                    "classname": "Help_ArticleDataController",
                    "method": "getData",
                    "params": {
                        "articleParameters": {
                            "urlName": articleId,
                            "language": "en_US",
                            "release": "260.0.0",
                            "requestedArticleType": "HelpDocs",
                            "requestedArticleTypeNumber": "5"
                        }
                    },
                    "cacheable": false,
                    "isContinuation": false
                }
            }]
        };

        const formData = new URLSearchParams();
        formData.append('message', JSON.stringify(payload));
        formData.append('aura.context', JSON.stringify({
            "mode": "PROD",
            "fwuid": "SHNaWGp5QlJqZFZLVGR5N0w0d0tYUTJEa1N5enhOU3R5QWl2VzNveFZTbGcxMy4tMjE0NzQ4MzY0OC45OTYxNDcy",
            "app": "siteforce:communityApp"
        }));
        formData.append('aura.pageURI', url.pathname + url.search);
        formData.append('aura.token', 'null');

        const response = await fetch('https://help.salesforce.com/s/sfsites/aura', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': '*/*'
            },
            body: formData.toString()
        });

        if (!response.ok) return null;

        const jsonText = await response.text();
        const json = JSON.parse(jsonText);

        const actionResult = json.actions?.[0]?.returnValue;
        if (!actionResult || !actionResult.returnValue || !actionResult.returnValue.record) {
            return null;
        }

        const record = actionResult.returnValue.record;
        const htmlContent = record.Content__c || record.Summary;
        const title = record.Title || 'Salesforce Help Article';

        if (!htmlContent) return null;

        const markdown = turndownService.turndown(htmlContent);

        // Naive extraction of child links from HTML
        const childLinksMatch = [...htmlContent.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
        const cleanChildLinks = Array.from(new Set(
            childLinksMatch
                .filter(u => !u.startsWith('#') && !u.startsWith('java') && !u.startsWith('mailto'))
                .map(u => {
                    if (u.startsWith('http')) return u;
                    if (u.startsWith('/')) return `https://help.salesforce.com${u}`;
                    return `https://help.salesforce.com/s/${u}`;
                })
                .filter(u => !baseDomain || u.includes(baseDomain))
        ));

        const hash = crypto.createHash('md5').update(markdown).digest('hex');

        return {
            url: urlStr,
            title,
            markdown,
            hash,
            childLinks: cleanChildLinks
        };
    } catch (e) {
        return null;
    }
}

/**
 * Extracts content from a single URL, handling shadow DOMs, iframes, and various SFDC template structures.
 */
export async function scrapePage(url: string, baseDomain?: string): Promise<ScrapedPage> {
    // 1. Aura SPA Fast-Path directly hitting the backend Salesforce APIs
    const auraResult = await scrapeAuraArticle(url, baseDomain);
    if (auraResult) {
        return auraResult;
    }

    // 1.5 Native PDF Extraction
    if (url.toLowerCase().endsWith('.pdf')) {
        try {
            console.log(`[PDF Extraction] Downloading ${url}...`);
            const pdfResponse = await fetch(url);
            if (!pdfResponse.ok) {
                return {
                    url,
                    title: 'Error',
                    markdown: '',
                    hash: '',
                    error: `PDF HTTP Error ${pdfResponse.status}: ${pdfResponse.statusText}`,
                    childLinks: []
                };
            }
            const buffer = await pdfResponse.arrayBuffer();
            const data = await pdf(Buffer.from(buffer));

            // Generate a simple markdown representation
            const title = url.split('/').pop() || 'PDF Document';
            const markdown = `# ${title}\n\n${data.text}`;
            const hash = crypto.createHash('sha256').update(markdown).digest('hex');

            return {
                url,
                title,
                markdown,
                hash,
                childLinks: [] // PDFs don't typically yield crawlable HTML links natively this way
            };
        } catch (e: any) {
            return {
                url,
                title: 'Error',
                markdown: '',
                hash: '',
                error: `PDF Parse Error: ${e.message}`,
                childLinks: []
            };
        }
    }

    // 2. Headless Chrome Fallback for everything else (LWC, Standard Web, etc.)
    const browserInstance = await getBrowser();
    const page = await browserInstance.newPage();

    try {
        await page.setViewport({ width: 1280, height: 800 });
        // User agent to look normal
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // Wait until network is idle specifically to handle SPA renders and iframe loads
        const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

        // BUG-04 check: If the page returns an HTTP error code natively, fail fast.
        if (response && !response.ok()) {
            return {
                url,
                title: 'Error',
                markdown: '',
                hash: '',
                error: `HTTP Error ${response.status()}: ${response.statusText()}`,
                childLinks: []
            };
        }

        // Wait for specific Salesforce content locators to appear to avoid grabbing 'Loading...' pages
        try {
            if (url.includes('help.salesforce.com')) {
                // Wait for the main body to render something meaningful (avoiding specific legacy classes)
                await page.waitForSelector('body', { timeout: 15000 });
            } else if (url.includes('developer.salesforce.com')) {
                await page.waitForFunction(() => {
                    return document.querySelector('doc-content-layout') ||
                        document.querySelector('doc-xml-content') ||
                        document.querySelector('iframe');
                }, { timeout: 10000 });
            }
        } catch (e) {
            console.warn(`Timeout waiting for specific content selectors on ${url}`);
        }

        // Additional wait just in case visual components are still sliding in
        await new Promise(r => setTimeout(r, 2000));

        // Take an opportunistic screenshot if development debugging layout issues
        if (url.includes('help.salesforce.com')) {
            await page.screenshot({ path: 'help_debug_test.png' }).catch(() => { });
        }

        // In-page extraction script
        const extraction = await page.evaluate(() => {
            // Flattened DOM Extraction Logic to bypass TS __name bugs
            let title = document.querySelector('title')?.innerText || 'Untitled';
            let finalHtml = '';
            const childLinks = new Set<string>();

            // Collect all same-site hierarchical links using an iterative deep shadow DOM search
            const rootsToProcess = [document as Document | ShadowRoot | Element];

            while (rootsToProcess.length > 0) {
                const currentRoot = rootsToProcess.pop()!;

                // Grab links
                const aTags = currentRoot.querySelectorAll('a');
                aTags.forEach(a => {
                    if (a.href && !a.href.startsWith('java') && !a.href.startsWith('mailto')) {
                        childLinks.add(a.href);
                    }
                });

                const allElements = currentRoot.querySelectorAll('*');
                for (let i = 0; i < allElements.length; i++) {
                    const el = allElements[i];
                    if (el.shadowRoot) {
                        rootsToProcess.push(el.shadowRoot);
                    }
                }
            }

            // BUG-04: Catch soft 404s rendered by the SPA
            if (title.includes('404 Error')) {
                return { html: '', title: 'Error', error: 'HTTP 404 - Page Not Found', childLinks: Array.from(childLinks) };
            }

            // Catch SPA shells that failed to load content BEFORE generic tag fallbacks
            const bodyHtml = document.body.innerText;
            if (bodyHtml.includes('Sorry to interrupt')) {
                return {
                    html: '',
                    title: 'Error',
                    error: 'Found no accessible documentation content on this page. It may require authentication, be a soft 404, rendering timed out, or JavaScript rendering is required.',
                    childLinks: []
                };
            }

            // --- STRATEGY 1: Iframe (Older Developer Guides) ---
            const iframe = document.querySelector('iframe');
            if (iframe && iframe.contentDocument && iframe.contentDocument.body) {
                const docHtml = iframe.contentDocument.querySelector('#doc')?.innerHTML ||
                    iframe.contentDocument.querySelector('body')?.innerHTML || '';
                const docTitle = iframe.contentDocument.querySelector('title')?.innerText ||
                    iframe.contentDocument.querySelector('h1')?.innerText || 'Untitled';

                iframe.contentDocument.querySelectorAll('a').forEach(a => {
                    if (a.href && !a.href.startsWith('java') && !a.href.startsWith('mailto')) {
                        childLinks.add(a.href);
                    }
                });

                if (docHtml.length > 500) {
                    return { html: docHtml, title: docTitle, childLinks: Array.from(childLinks) };
                }
            }

            // --- STRATEGY 2: Help.salesforce.com Shadow DOM Search ---
            let sldsText: Element | null = null;
            const searchRoots = [document as Document | ShadowRoot | Element];
            while (searchRoots.length > 0 && !sldsText) {
                const current = searchRoots.pop()!;
                const found = current.querySelector('.slds-text-longform');
                if (found) {
                    sldsText = found;
                    break;
                }
                const all = current.querySelectorAll('*');
                for (let i = 0; i < all.length; i++) {
                    if (all[i].shadowRoot) searchRoots.push(all[i].shadowRoot!);
                }
            }

            if (sldsText) {
                title = title.replace(' | Salesforce', '').trim();
                return { html: sldsText.innerHTML, title, childLinks: Array.from(childLinks) };
            }

            // --- STRATEGY 3: legacy doc-xml-content ---
            const docXmlContent = document.querySelector('doc-xml-content');
            if (docXmlContent?.shadowRoot) {
                const docContent = docXmlContent.shadowRoot.querySelector('doc-content');
                if (docContent?.shadowRoot) {
                    const innerHtml = docContent.shadowRoot.innerHTML;
                    const h1Match = innerHtml.match(/<h1[^>]*>(.*?)<\/h1>/);
                    if (h1Match) title = h1Match[1].replace(/<[^>]*>?/gm, '');

                    docContent.shadowRoot.querySelectorAll('a').forEach(a => {
                        if (a.href && !a.href.startsWith('java') && !a.href.startsWith('mailto')) {
                            childLinks.add(a.href);
                        }
                    });

                    return { html: innerHtml, title, childLinks: Array.from(childLinks) };
                }
            }

            // --- STRATEGY 4: Modern doc-amf-reference ---
            const docRef = document.querySelector('doc-amf-reference');
            if (docRef) {
                const markdownContent = docRef.querySelector('.markdown-content');
                if (markdownContent) {
                    // Quick and dirty extraction, bypass complex legacy parser
                    const h1 = markdownContent.querySelector('h1');
                    if (h1) title = h1.textContent?.trim() || title;
                    return { html: markdownContent.innerHTML, title, childLinks: Array.from(childLinks) };
                }
            }

            const docLayout = document.querySelector('doc-content-layout');
            if (docLayout?.shadowRoot) {
                const slot = docLayout.shadowRoot.querySelector('.content-body slot') as HTMLSlotElement | null;
                if (slot) {
                    const assignedElements = slot.assignedElements();
                    if (assignedElements.length > 0) {
                        let guideHtml = '';
                        for (const el of assignedElements) {
                            if (el.tagName?.toLowerCase() === 'h1') title = el.textContent?.trim() || title;
                            guideHtml += el.outerHTML;
                        }
                        return { html: guideHtml, title, childLinks: Array.from(childLinks) };
                    }
                }
            }

            // --- STRATEGY 5: Fallbacks ---
            const container = document.querySelector('article') || document.querySelector('main');
            if (container) {
                title = document.querySelector('h1')?.innerText || title;
                return { html: container.innerHTML, title, childLinks: Array.from(childLinks) };
            }

            // Complete fallback - BUG-01 & BUG-02
            const isHelpSite = window.location.href.includes('help.salesforce.com');
            if (isHelpSite || document.body.innerHTML.length > 100000) {
                return {
                    html: '',
                    title: 'Error',
                    error: 'Found no accessible documentation content on this page. It may require authentication, be a soft 404, rendering timed out, or JavaScript rendering is required.',
                    childLinks: []
                };
            }

            return {
                html: document.body.innerHTML,
                title,
                childLinks: Array.from(childLinks)
            };
        });

        if (!extraction.html || extraction.html.trim() === '') {
            return {
                url,
                title: extraction.title || 'Untitled',
                markdown: '',
                hash: '',
                error: (extraction as any).error || 'No content found on page',
                childLinks: extraction.childLinks || []
            };
        }

        // Convert to markdown
        let markdown = turndownService.turndown(extraction.html);

        // Filter child links to stay within the domain/base if provided, to avoid massive spidering
        let validLinks = extraction.childLinks;
        if (baseDomain) {
            validLinks = validLinks.filter(l => l.startsWith(baseDomain));
        }

        const hash = crypto.createHash('sha256').update(markdown).digest('hex');

        return {
            url,
            title: extraction.title,
            markdown,
            hash,
            childLinks: validLinks,
        };
    } catch (error: any) {
        return {
            url,
            title: 'Error',
            markdown: '',
            hash: '',
            error: error.message,
            childLinks: [],
        };
    } finally {
        await page.close();
    }
}

/**
 * Ensures the browser is closed when application shuts down
 */
export async function closeBrowser() {
    if (browser) {
        await browser.close();
        browser = null;
    }
}
