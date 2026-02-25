// Using native fetch

async function testAuraFullPayload() {
    const urlStr = 'https://help.salesforce.com/s/articleView?id=ind.lsc_next_best_actions.htm&type=5';
    const url = new URL(urlStr);
    const articleId = url.searchParams.get('id');

    const payload = {
        "actions": [{
            "id": "1;a",
            "descriptor": "apex://Help_ArticleDataController/ACTION$getData",
            "callingDescriptor": "UNKNOWN",
            "classname": "Help_ArticleDataController",
            "method": "getData",
            "params": {
                "articleParameters": {
                    "urlName": articleId,
                    "language": "en_US",
                    "release": "260.0.0",
                    "requestedArticleType": "HelpDocs",
                    "requestedArticleTypeNumber": "5"
                }
            },
            "cacheable": false,
            "isContinuation": false
        }]
    };

    const formData = new URLSearchParams();
    formData.append('message', JSON.stringify(payload));
    formData.append('aura.context', JSON.stringify({
        "mode": "PROD",
        "fwuid": "SHNaWGp5QlJqZFZLVGR5N0w0d0tYUTJEa1N5enhOU3R5QWl2VzNveFZTbGcxMy4tMjE0NzQ4MzY0OC45OTYxNDcy",
        "app": "siteforce:communityApp"
    }));
    formData.append('aura.pageURI', url.pathname + url.search);
    formData.append('aura.token', 'null');

    console.log(`Fetching from Aura API...`);
    const response = await fetch('https://help.salesforce.com/s/sfsites/aura', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
        },
        body: formData.toString()
    });

    if (!response.ok) {
        console.error("HTTP Error", response.status);
        return;
    }

    const rawText = await response.text();
    import('fs').then(fs => {
        fs.writeFileSync('aura_raw_dump.txt', rawText);
        console.log("Dumped full raw text to aura_raw_dump.txt");
    });
}

testAuraFullPayload().catch(console.error);
