import { scrapePage } from './dist/scraper.js';

async function test() {
    const url = "https://help.salesforce.com/s/articleView?id=sales.lightning_sync_move_consider.htm&language=en_US&type=5";
    console.log(`Scraping ${url}...`);
    const result = await scrapePage(url);
    console.log("Result error:", result.error);
    console.log("Result title:", result.title);
    console.log("Markdown length:", result.markdown?.length);
    if (!result.error) {
        console.log(result.markdown.substring(0, 500));
    }
}
test().catch(console.error);
