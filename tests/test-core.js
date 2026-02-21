import { closeBrowser } from '../dist/scraper.js';
import { saveDocument, searchDocuments } from '../dist/db.js';
import { execSync } from 'child_process';

const mcpPath = './dist/index.js';

async function runTest() {
    console.log("=== Testing mass_extract_guide ===");
    // We will simulate calling the MCP tool via CLI or just running the logic here, but actually it's easier to just run the built file and pass args if it was a CLI. 
    // Since it's an MCP server, communicating standard I/O is hard programmatically. 
    // I will test the core functions instead.

    const { scrapePage } = await import('../dist/scraper.js');

    const testUrl = 'https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/life_sciences_customer_engagement_data_model.htm';

    console.log(`Scraping ${testUrl}...`);
    const result = await scrapePage(testUrl, new URL(testUrl).origin);

    console.log(`Title: ${result.title}`);
    console.log(`Markdown length: ${result.markdown.length}`);
    console.log(`Links found: ${result.childLinks.length}`);

    if (result.error) {
        console.error("Error scraping:", result.error);
        process.exit(1);
    }

    console.log("Saving to DB...");
    await saveDocument(result.url, result.title, result.markdown, result.hash, 'health_cloud');

    console.log("Searching DB for 'cookie'...");
    const searchRes = await searchDocuments('cookie', 5);
    console.log(`Found ${searchRes.length} results.`);
    if (searchRes.length > 0) {
        console.log(`Top result: ${searchRes[0].title} (Score: ${searchRes[0].score})`);
    }

    await closeBrowser();
    process.exit(0);
}

runTest().catch(console.error);
