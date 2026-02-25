import { scrapePage, closeBrowser } from '../dist/scraper.js';

const urlsToTest = [
    'https://help.salesforce.com/s/articleView?id=ind.lsc_customer_engagement_get_org_ready.htm&language=en_US&type=5',
    'https://help.salesforce.com/s/articleView?id=ind.lsc_samples_management.htm&type=5',
    'https://help.salesforce.com/s/articleView?id=sales.eac_email_activity_flow.htm&language=en_US&type=5',
    'https://help.salesforce.com/s/articleView?id=sales.sales_productivity.htm&type=5',
    'https://help.salesforce.com/s/articleView?id=sales.pipeline_mgmt_parent.htm&type=5',
    'https://help.salesforce.com/s/articleView?id=sales.sales_cloud_agents.htm&type=5'
];

async function runTests() {
    console.log("=== Testing User Provided URLs ===\n");
    let passed = 0;

    for (const url of urlsToTest) {
        console.log(`Scraping: ${url}`);
        const result = await scrapePage(url);

        if (result.error) {
            console.error(`❌ FAILED: ${result.error}\n`);
        } else if (result.markdown.trim().length === 0) {
            console.error(`❌ FAILED: No content extracted (0 bytes)\n`);
        } else {
            console.log(`✅ SUCCESS - Title: "${result.title}"`);
            console.log(`   Markdown Length: ${result.markdown.length} chars`);
            console.log(`   Links Found: ${result.childLinks.length}`);
            console.log(`   Sample text: ${result.markdown.substring(0, 150).replace(/\n/g, ' ')}...\n`);
            passed++;
        }
    }

    console.log(`=== Summary: ${passed}/${urlsToTest.length} passed ===`);
    await closeBrowser();
    process.exit(passed === urlsToTest.length ? 0 : 1);
}

runTests().catch(console.error);
