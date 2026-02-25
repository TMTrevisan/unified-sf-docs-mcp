import { scrapePage, closeBrowser } from './dist/scraper.js';

async function testPdf() {
    console.log("Testing PDF Native Extraction...");
    const url = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

    const result = await scrapePage(url);
    console.log(`Title: ${result.title}`);
    console.log(`Hash: ${result.hash}`);
    console.log(`Markdown Preview (first 100 chars): ${result.markdown.substring(0, 100)}...`);

    await closeBrowser();
    process.exit(0);
}

testPdf().catch(console.error);
