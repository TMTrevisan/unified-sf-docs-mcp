import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

async function run() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Log network redirects and API calls to see where it breaks
    page.on('response', response => {
        if ([301, 302, 404, 500].includes(response.status()) || response.url().includes('aura')) {
            console.log(`[NETWORK] ${response.status()} ${response.url()}`);
        }
    });

    const url = 'https://help.salesforce.com/s/articleView?id=sf.sales_admin_setup.htm&type=5';
    console.log(`Navigating to: ${url}`);
    
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    
    const title = await page.title();
    console.log(`Final Title: ${title}`);
    
    const errorText = await page.evaluate(() => {
        const bodyText = document.body.innerText;
        if (bodyText.includes("We looked high and low")) return "Soft-404 Detected in DOM";
        if (bodyText.includes("Sorry to interrupt")) return "Akamai Bot Block Detected in DOM";
        return "Page loaded normally?";
    });
    
    console.log(`Page State: ${errorText}`);
    
    await page.screenshot({ path: 'help_debug_user.png' });
    await browser.close();
}

run().catch(console.error);
