import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

async function test() {
    const url = process.argv[2] || "https://help.salesforce.com/s/articleView?id=ind.lsc_setup_life_sciences_cloud_customer_engagement_features.htm&type=5";

    // Try with the new headless mode which has better anti-bot evasion
    const browser = await puppeteer.launch({
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=1920,1080',
            '--disable-blink-features=AutomationControlled'
        ]
    });
    const page = await browser.newPage();

    // Also intercept HTTP Requests to view POST payloads
    page.on('request', request => {
        const reqUrl = request.url();
        if (reqUrl.includes('sfsites/aura') && request.method() === 'POST') {
            const postData = request.postData();
            if (postData && postData.includes('ind.lsc_setup_life')) {
                console.log(`\n\n[FOUND OUTGOING AURA POST to ${reqUrl}] >>>`);
                console.log(postData);
            }
        }
    });

    page.on('response', async (response) => {
        const reqUrl = response.url();
        const type = response.request().resourceType();
        if (reqUrl.includes('sfsites/aura')) {
            try {
                const text = await response.text();
                // Check if the response contains the article title or signature text
                if (text.includes('Engagement') || text.includes('Life Sciences')) {
                    console.log(`\n\n[FOUND AURA PAYLOAD in ${reqUrl}] >>>`);
                    console.log(text.substring(0, 1000) + "... [truncated]");
                }
            } catch (e) { }
        }
    });

    console.log(`Navigating to ${url}...`);

    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 6000));

    const html = await page.evaluate(() => document.body.innerHTML.substring(0, 1500));
    console.log("Raw HTML Snippet:");
    console.log(html);

    // See if any known article text wrappers exist
    const articleContent = await page.evaluate(() => {
        const content = document.querySelector('.content') || document.querySelector('article') || document.querySelector('.forceCommunityArticleContent');
        return content ? "FOUND ARTICLE COMPONENT: " + content.tagName : "NO ARTICLE COMPONENT FOUND in DOM";
    });
    console.log(articleContent);

    await browser.close();
}

test().catch(console.error);
