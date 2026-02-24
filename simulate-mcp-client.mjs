import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
    console.log("Starting MCP Client Simulation...");
    const transport = new StdioClientTransport({
        command: "node",
        args: ["dist/index.js"]
    });

    const client = new Client({ name: "test-client", version: "1.0.0" }, { capabilities: {} });
    await client.connect(transport);
    console.log("Connected to MCP Server!");

    // Test 1: Empty DB check
    console.log("\\n--- TEST 1: EMPTY DB CHECK ---");
    try {
        const res1 = await client.callTool({
            name: "search_local_docs",
            arguments: { query: "Life Sciences Cloud next best action" }
        });
        console.log("Result:");
        console.log(res1.content[0].text);
    } catch (e) {
        console.error("Test 1 Failed", e);
    }

    // Test 2: Mass Extract
    console.log("\\n--- TEST 2: MASS EXTRACT ---");
    try {
        const res2 = await client.callTool({
            name: "mass_extract_guide",
            arguments: { rootUrl: "https://developer.salesforce.com/docs/platform/data-models/guide/life-sciences-cloud-category.html", maxPages: 2 }
        });
        console.log("Result:");
        console.log(res2.content[0].text);
    } catch (e) {
        console.error("Test 2 Failed", e);
    }

    // Test 3: Search DB again
    console.log("\\n--- TEST 3: SEARCH DB POST-EXTRACT ---");
    try {
        const res3 = await client.callTool({
            name: "search_local_docs",
            arguments: { query: "life sciences partner" }
        });
        console.log("Result:");
        // Print just a snippet if it's too long
        console.log(res3.content[0].text.substring(0, 500) + '...');
    } catch (e) {
        console.error("Test 3 Failed", e);
    }

    // Test 4: Soft 404 Check
    console.log("\\n--- TEST 4: SOFT 404 CHECK ---");
    try {
        const res4 = await client.callTool({
            name: "scrape_single_page",
            arguments: { url: "https://developer.salesforce.com/docs/platform/data-models/guide/this-is-a-fake-page-that-will-404.html" }
        });
        console.log("Result:");
        console.log(JSON.stringify(res4, null, 2));
    } catch (e) {
        console.error("Test 4 Failed", e);
    }

    // Test 5: SPA JS Shell Check (help.salesforce.com)
    console.log("\\n--- TEST 5: SPA BOOTSTRAPPER CHECK ---");
    try {
        // Find a random specific help article url
        const res5 = await client.callTool({
            name: "scrape_single_page",
            arguments: { url: "https://help.salesforce.com/s/articleView?id=ind.lsc_next_best_actions.htm&type=5" }
        });
        console.log("Result:");
        console.log(JSON.stringify(res5, null, 2));
    } catch (e) {
        console.error("Test 5 Failed", e);
    }

    console.log("\\nCleaning up...");
    await transport.close();
    process.exit(0);
}

main().catch(console.error);
