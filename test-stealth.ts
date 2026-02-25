import { scrapePage } from './src/scraper';

async function runTest() {
    const url = 'https://help.salesforce.com/s/articleView?id=sf.sales_admin_setup.htm&type=5';
    console.log(`Testing stealth scrape on ${url}`);

    // We expect the stealth plugin to let us see the actual content + any available links
    const result = await scrapePage(url);

    console.log("--- SCRAPE RESULT ---");
    console.log("Title:", result.title);
    if (result.error) {
        console.error("Error:", result.error);
    } else {
        console.log(`Markdown Length: ${result.markdown.length} chars`);
        console.log(`Total Child Links Found: ${result.childLinks.length}`);
        if (result.childLinks.length > 0) {
            console.log("Sample Child Links (First 5):");
            result.childLinks.slice(0, 5).forEach(l => console.log(l));
        }
    }

    // forcefully exit
    process.exit(0);
}

runTest();
