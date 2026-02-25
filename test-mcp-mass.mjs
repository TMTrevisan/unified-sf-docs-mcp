import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
    process.env.DEBUG = '*'; // Enable all debug logging
    console.log("Starting MCP Client test for mass_extract_guide...");
    const transport = new StdioClientTransport({
        command: "node",
        args: ["dist/index.js"]
    });

    const client = new Client({ name: "test-client", version: "1.0.0" }, { capabilities: {} });
    await client.connect(transport);

    console.log("Connected to MCP Server! Running mass_extract_guide...");
    try {
        const res = await client.callTool({
            name: "mass_extract_guide",
            arguments: {
                rootUrl: "https://developer.salesforce.com/docs/platform/data-models/guide/life-sciences-cloud-category.html",
                maxPages: 3
            }
        });
        console.log("\\n\\n--- RESULT ---");
        console.log(res.content[0].text);
    } catch (e) {
        console.error("Test Failed", e);
    }

    console.log("\\nCleaning up...");
    await transport.close();
    process.exit(0);
}

main().catch(console.error);
