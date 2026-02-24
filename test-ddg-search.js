import { search } from 'duck-duck-scrape';

async function testSearch(query) {
    console.log(`Searching DuckDuckGo for: ${query}`);
    const searchResults = await search(query);

    const links = searchResults.results.map(r => ({
        title: r.title,
        url: r.url,
        description: r.description
    }));

    console.log(`Found ${links.length} results.`);
    console.dir(links.slice(0, 10), { depth: null });
}

// Restrict to core salesforce doc domains
const query = 'site:developer.salesforce.com/docs OR site:help.salesforce.com Einstein Activity Capture Migration';
testSearch(query).catch(console.error);
