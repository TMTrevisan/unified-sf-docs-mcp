import { exportLocalDocuments } from './dist/db.js';

async function testExport() {
    console.log("Testing Export Local Documents feature...");
    const outputPath = "/Users/toddtrevisan/Documents/SFDC Docs/unified-sf-docs-mcp/test-export.md";

    // We already have 9 documents in the DB from the previous test.
    // Let's export all of them into one file.
    const result = await exportLocalDocuments(outputPath);
    console.log(result);
    process.exit(0);
}

testExport().catch(console.error);
