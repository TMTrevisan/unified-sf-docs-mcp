import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

async function test() {
    const url = process.argv[2] || "https://help.salesforce.com/s/articleView?id=sales.lightning_sync_move_consider.htm&language=en_US&type=5";
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    console.log(`Navigating to ${url}...`);

    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 6000));

    const html = await page.evaluate(() => document.body.innerHTML.substring(0, 1500));
    console.log("Raw HTML Snippet:");
    console.log(html);

    // Check if there are any shadow roots we can peek into
    const elementTags = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('*')).slice(0, 100).map(e => e.tagName.toLowerCase());
    });
    console.log("First 100 element tags:", elementTags.join(', '));

    await browser.close();
}

test().catch(console.error);
