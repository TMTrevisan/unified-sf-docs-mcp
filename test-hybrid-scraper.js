import { scrapePage } from './dist/scraper.js';

async function verify() {
    console.log("--- TEST 1: AURA FAST PATH ---");
    const auraUrl = "https://help.salesforce.com/s/articleView?id=ind.lsc_setup_life_sciences_cloud_customer_engagement_features.htm&type=5";
    const start1 = Date.now();
    const res1 = await scrapePage(auraUrl);
    const time1 = Date.now() - start1;
    console.log(`Success! Extracted ${res1.title} in ${time1}ms. Chars: ${res1.markdown.length}`);

    console.log("\n--- TEST 2: LWC PUPPETEER FALLBACK ---");
    const docUrl = "https://developer.salesforce.com/docs/platform/data-models/guide/life-sciences-cloud-category.html";
    const start2 = Date.now();
    const res2 = await scrapePage(docUrl);
    const time2 = Date.now() - start2;
    console.log(`Success! Extracted ${res2.title} in ${time2}ms. Chars: ${res2.markdown.length}`);

    process.exit(0);
}

verify().catch(console.error);
