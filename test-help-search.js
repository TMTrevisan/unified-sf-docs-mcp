import puppeteer from 'puppeteer';

async function testSearch(query) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const sfUrl = `https://help.salesforce.com/s/global-search/%20?language=en_US#q=${encodeURIComponent(query)}`;
    console.log(`Navigating to ${sfUrl}...`);

    await page.goto(sfUrl, { waitUntil: 'networkidle2' });

    await new Promise(r => setTimeout(r, 8000)); // Wait for Coveo/results to render

    // Evaluate and pull all links inside the search results container
    const links = await page.evaluate(() => {
        function getLinks(root) {
            let found = [];
            const anchors = Array.from(root.querySelectorAll('a'));
            for (const a of anchors) {
                if (a.href && (a.href.includes('/articleView') || a.href.includes('/docs/'))) {
                    found.push({ title: a.innerText.trim(), href: a.href });
                }
            }

            const allElements = root.querySelectorAll('*');
            for (const el of Array.from(allElements)) {
                if (el.shadowRoot) {
                    found = found.concat(getLinks(el.shadowRoot));
                }
            }
            return found;
        }
        return getLinks(document);
    });

    console.log(`Found ${links.length} docs links:`);
    console.log(JSON.stringify(links.filter(l => l.title), null, 2));

    await browser.close();
}

testSearch('Einstein Activity Capture Migration').catch(console.error);
