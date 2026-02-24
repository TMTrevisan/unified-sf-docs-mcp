import { searchDocuments } from "./dist/db.js";

async function test() {
    console.log("Searching for: next best territory score");
    const results = await searchDocuments("next best territory score");
    console.log("Results found:", results.length);
    for (const r of results) {
        console.log("-", r.url, "Score:", r.score);
    }
}
test().catch(console.error);
