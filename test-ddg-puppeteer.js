import puppeteer from 'puppeteer';

async function testSearch(query) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&t=h_&ia=web`;
    console.log(`Navigating to ${url}...`);

    await page.goto(url, { waitUntil: 'networkidle2' });

    // Evaluate and pull all organic links
    const links = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a[data-testid="result-title-a"]'));
        return anchors.map(a => ({ title: a.innerText.trim(), href: a.href }));
    });

    console.log(`Found ${links.length} organic links:`);
    console.dir(links, { depth: null });

    await browser.close();
}

const query = 'site:developer.salesforce.com/docs OR site:help.salesforce.com Einstein Activity Capture Migration';
testSearch(query).catch(console.error);
