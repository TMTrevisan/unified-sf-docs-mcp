import TurndownService from 'turndown';

async function testAuraFetch(urlStr) {
    console.log(`Extracting from: ${urlStr}`);
    const url = new URL(urlStr);
    const articleId = url.searchParams.get('id');

    if (!articleId || !url.hostname.includes('help.salesforce.com')) {
        console.error("Not a valid help.salesforce.com article URL");
        return;
    }

    const payload = {
        "actions": [{
            "id": "1;a",
            "descriptor": "aura://ApexActionController/ACTION$execute",
            "callingDescriptor": "UNKNOWN",
            "params": {
                "namespace": "",
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
            }
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

    console.log("Sending POST to sfsites/aura...");

    const response = await fetch('https://help.salesforce.com/s/sfsites/aura', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': '*/*'
        },
        body: formData.toString()
    });

    const jsonText = await response.text();
    const json = JSON.parse(jsonText);

    try {
        const actionResult = json.actions[0].returnValue;
        const htmlContent = actionResult.returnValue.record.Content__c || actionResult.returnValue.record.Summary;
        const title = actionResult.returnValue.record.Title;

        console.log(`\n\nSUCCESS! Retrieved Data for: ${title}`);

        const turndownService = new TurndownService({
            headingStyle: 'atx',
            codeBlockStyle: 'fenced'
        });
        const markdown = turndownService.turndown(htmlContent);

        console.log("--- MARKDOWN PREVIEW ---");
        console.log(markdown.substring(0, 1000));
        console.log("\\n... (successfully parsed full text) ...");
    } catch (e) {
        console.error("Failed to parse the expected returning JSON structure");
        console.log(jsonText.substring(0, 1000));
    }
}

testAuraFetch(process.argv[2] || "https://help.salesforce.com/s/articleView?id=ind.lsc_setup_life_sciences_cloud_customer_engagement_features.htm&type=5").catch(console.error);
