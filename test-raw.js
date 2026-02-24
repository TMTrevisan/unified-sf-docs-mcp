import { getDatabase } from "./dist/db.js";

async function run() {
    const database = await getDatabase();
    const query = "next best territory score";
    const queryLower = query.toLowerCase();
    const searchTerms = queryLower.split(/\s+/).filter(w => w.length > 2);

    console.log("Search terms:", searchTerms);

    const likeConditions = searchTerms.map(t => 'c.content_lower LIKE ?').join(' OR ');
    const params = searchTerms.map(t => `%${t}%`);
    console.log("Like Conditions:", likeConditions);
    console.log("Params:", params);

    const sql = `
        SELECT 
            d.id, d.url, d.title, d.category,
            c.content, c.content_lower
        FROM chunks c
        JOIN documents d ON c.document_id = d.id
        WHERE (${likeConditions})
        LIMIT 1000
    `;

    const stmt = database.prepare(sql);
    stmt.bind(params);

    const rows = [];
    const columns = stmt.getColumnNames();
    while (stmt.step()) {
        const rowData = stmt.get();
        const row = {};
        columns.forEach((col, idx) => row[col] = rowData[idx]);
        rows.push(row);
    }
    stmt.free();

    console.log(`Matched ${rows.length} chunks from SQLite directly.`);
}

run().catch(console.error);
