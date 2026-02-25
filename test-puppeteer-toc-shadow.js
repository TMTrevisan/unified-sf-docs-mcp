import puppeteer from 'puppeteer';
import * as fs from 'fs';

async function testPuppeteerTOC() {
    console.log("Starting Puppeteer deep shadow DOM trace...");
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
        defaultViewport: { width: 1920, height: 1080 }
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // A valid Help guide article
    const url = 'https://help.salesforce.com/s/articleView?id=sf.sales_admin_setup.htm&type=5';

    console.log(`Navigating to ${url}...`);
    try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    } catch (e) {
        console.error("Goto error:", e);
    }

    await page.screenshot({ path: 'valid_help_layout.png', fullPage: true });
    console.log("Saved valid_help_layout.png");

    // Evaluate links with deep shadow DOM traversal and grab text
    const links = await page.evaluate(() => {
        const linkList = [];

        function extractLinksFromRoot(root) {
            const aTags = root.querySelectorAll('a');
            aTags.forEach(a => {
                if (a.href) {
                    const text = a.innerText || a.textContent || '';
                    linkList.push({ href: a.href, text: text.trim().replace(/\\n/g, ' ') });
                }
            });

            const allElements = root.querySelectorAll('*');
            for (const el of Array.from(allElements)) {
                if (el.shadowRoot) {
                    extractLinksFromRoot(el.shadowRoot);
                }
            }
        }

        extractLinksFromRoot(document);
        return linkList;
    });

    // Write out all links to a file to examine
    let out = "Extracted Links:\\n";
    links.forEach(l => {
        out += `${l.text} -> ${l.href}\\n`;
    });
    fs.writeFileSync('help_links_dump.txt', out);
    console.log(`Wrote ${links.length} links to help_links_dump.txt`);

    await browser.close();
}

testPuppeteerTOC().catch(console.error);
