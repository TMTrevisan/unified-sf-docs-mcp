import puppeteer from 'puppeteer';

async function testPuppeteerTOC() {
    console.log("Starting Puppeteer check for TOC links...");
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    const url = 'https://help.salesforce.com/s/articleView?id=ind.lsc_next_best_actions.htm&type=5';

    console.log(`Navigating to ${url}...`);
    try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    } catch (e) {
        console.error("Goto error:", e);
    }

    // Evaluate links
    await page.screenshot({ path: 'help_layout.png', fullPage: true });
    console.log("Saved help_layout.png");

    const links = await page.evaluate(() => {
        const linkList = [];
        document.querySelectorAll('a').forEach(a => {
            if (a.href && !a.href.startsWith('java') && !a.href.startsWith('mailto')) {
                linkList.push(a.href);
            }
        });
        return linkList;
    });

    // Look for articleView links specifically
    const articleLinks = [...new Set(links)].filter(l => l.includes('articleView') && l !== url);

    console.log(`Total links on page: ${links.length}`);
    console.log(`Knowledge ArticleLinks (excluding root): ${articleLinks.length}`);
    if (articleLinks.length > 0) {
        console.log("Found TOC links! Top 10:");
        articleLinks.slice(0, 10).forEach(l => console.log(l));
    }

    await browser.close();
}

testPuppeteerTOC().catch(console.error);
