import { scrapePage, closeBrowser } from '../dist/scraper.js';
import { saveDocument } from '../dist/db.js';

const urlsToTest = [
    // 1. Original Problematic Dev Guide (Iframe/Shadow DOM)
    'https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/life_sciences_customer_engagement_data_model.htm',
    // 2. Original Problematic Help Page (SLDS layout)
    'https://help.salesforce.com/s/articleView?id=ind.lsc_customer_engagement_setup_basics.htm&type=5',
    // 3. New Random Modern Dev Guide (Lightning Web Components)
    'https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.get_started_introduction'
];

async function runTests() {
    console.log("=== Testing Multiple Salesforce Doc Types ===\\n");
    let passed = 0;

    for (const url of urlsToTest) {
        console.log(`Scraping: ${url}`);
        const result = await scrapePage(url);

        if (result.error) {
            console.error(`❌ FAILED: ${result.error}\\n`);
        } else if (result.markdown.trim().length === 0) {
            console.error(`❌ FAILED: No content extracted (0 bytes)\\n`);
        } else {
            console.log(`✅ SUCCESS - Title: "${result.title}"`);
            console.log(`   Markdown Length: ${result.markdown.length} chars`);
            console.log(`   Links Found: ${result.childLinks.length}`);

            // Save to DB to test the flow
            await saveDocument(result.url, result.title, result.markdown, result.hash, 'test');
            console.log(`   Sample text: ${result.markdown.substring(0, 150).replace(/\\n/g, ' ')}...\\n`);
            passed++;
        }
    }

    console.log(`=== Summary: ${passed}/${urlsToTest.length} passed ===`);
    await closeBrowser();
    process.exit(passed === urlsToTest.length ? 0 : 1);
}

runTests().catch(console.error);
