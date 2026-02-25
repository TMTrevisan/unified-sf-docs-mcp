import puppeteer from 'puppeteer';

async function testPuppeteerText() {
    console.log("Starting Puppeteer visual text trace...");
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
        defaultViewport: { width: 1920, height: 1080 }
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    const url = 'https://help.salesforce.com/s/articleView?id=ind.lsc_next_best_actions.htm&type=5';

    console.log(`Navigating to ${url}...`);
    try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    } catch (e) {
        console.error("Goto error:", e);
    }

    // Evaluate full innerText to see what the user "sees"
    const text = await page.evaluate(() => {
        return document.body.innerText;
    });

    import('fs').then(fs => {
        fs.writeFileSync('help_text_dump.txt', text);
        console.log("Wrote full visual text to help_text_dump.txt");
    });

    await browser.close();
}

testPuppeteerText().catch(console.error);
