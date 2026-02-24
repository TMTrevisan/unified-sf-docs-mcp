import puppeteer from 'puppeteer';

async function testSearch(query) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const sfUrl = `https://developer.salesforce.com/search?q=${encodeURIComponent(query)}`;
    console.log(`Navigating to ${sfUrl}...`);

    await page.goto(sfUrl, { waitUntil: 'networkidle2' });

    await new Promise(r => setTimeout(r, 5000)); // Wait for the SPA search results to render

    // Evaluate and pull all links inside the search results container
    const links = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a'));
        return anchors
            .map(a => ({ title: a.innerText.trim(), href: a.href }))
            .filter(l => l.title && l.href.includes('docs/'));
    });

    console.log(`Found ${links.length} docs links:`);
    console.dir(links.slice(0, 10), { depth: null });

    await browser.close();
}

testSearch('Einstein Activity Capture Migration').catch(console.error);
