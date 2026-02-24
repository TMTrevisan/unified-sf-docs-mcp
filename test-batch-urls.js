import { scrapePage } from './dist/scraper.js';

const urls = [
    "https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/life_sciences_customer_engagement_data_model.htm",
    "https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/life_sciences_intelligent_content.htm",
    "https://help.salesforce.com/s/articleView?id=ind.lsc_customer_engagement_create_admin_profiles.htm&type=5",
    "https://help.salesforce.com/s/articleView?id=ind.lsc_email_get_ready.htm&type=5",
    "https://help.salesforce.com/s/articleView?id=release-notes.salesforce_release_notes.htm&release=260&type=5",
    "https://help.salesforce.com/s/articleView?id=ai.einstein_sales.htm&type=5",
    "https://help.salesforce.com/s/articleView?id=sales.sales_cloud_agents.htm&type=5",
    "https://help.salesforce.com/s/articleView?id=sales.aac_how_it_works.htm&type=5",
    "https://help.salesforce.com/s/articleView?id=sales.lightning_sync_move_why.htm&type=5"
];

async function run() {
    console.log(`Testing ${urls.length} URLs...\n`);
    let successCount = 0;

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        console.log(`[${i + 1}/${urls.length}] Scraping: ${url}`);

        const isAura = url.includes('articleView');
        if (isAura) {
            console.log(`  -> Expected Path: Aura Fast-Path (API Bypass)`);
        } else {
            console.log(`  -> Expected Path: Puppeteer (Shadow DOM Piercing)`);
        }

        const start = Date.now();
        try {
            const result = await scrapePage(url);
            const time = Date.now() - start;
            if (result && !result.error && result.markdown && result.markdown.length > 100) {
                console.log(`  ✅ SUCCESS! Title: "${result.title}"`);
                console.log(`  ⏱️ Time: ${time}ms | 📄 Markdown length: ${result.markdown.length} chars`);
                console.log(`  Preview: ${result.markdown.substring(0, 100).replace(/\n/g, ' ')}...`);
                successCount++;
            } else {
                console.log(`  ❌ FAILED! Error/Empty: ${result?.error || 'Empty markdown'}`);
            }
        } catch (e) {
            console.log(`  ❌ CRASH! Exception: ${e.message}`);
        }
        console.log("--------------------------------------------------");
    }

    console.log(`\nFinal Score: ${successCount} / ${urls.length} URLs scraped successfully.`);
    process.exit(0);
}

run().catch(console.error);
