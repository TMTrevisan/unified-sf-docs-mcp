import { scrapePage, closeBrowser } from './dist/scraper.js';

async function testMassExtract() {
    const rootUrl = "https://developer.salesforce.com/docs/platform/data-models/guide/life-sciences-cloud-category.html";
    console.log(`Testing extraction of child links from root: ${rootUrl}`);

    const rootResult = await scrapePage(rootUrl, new URL(rootUrl).origin);

    if (rootResult.error) {
        console.error("Root scrape failed:", rootResult.error);
        await closeBrowser();
        return;
    }

    console.log(`Success! Title: ${rootResult.title}`);
    console.log(`Found ${rootResult.childLinks.length} child links.`);

    const allLinks = [...new Set(rootResult.childLinks)].filter(l => l !== rootUrl);
    console.log(`Unique child links excluding root: ${allLinks.length}`);

    if (allLinks.length > 0) {
        console.log("First 5 links:");
        allLinks.slice(0, 5).forEach(l => console.log(` - ${l}`));
    }

    await closeBrowser();
}

testMassExtract().catch(console.error);
