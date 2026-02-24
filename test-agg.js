import { getDatabase } from "./dist/db.js";

async function run() {
    const database = await getDatabase();
    const query = "next best territory score";
    const queryLower = query.toLowerCase();
    const searchTerms = queryLower.split(/\s+/).filter(w => w.length > 2);

    const likeConditions = searchTerms.map(t => 'c.content_lower LIKE ?').join(' OR ');
    const params = searchTerms.map(t => `%${t}%`);

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
    let columns;
    try {
        columns = stmt.getColumnNames();
    } catch (e) {
        console.error("error get col names", e);
        return;
    }

    while (stmt.step()) {
        const rowData = stmt.get();
        const row = {};
        columns.forEach((col, idx) => row[col] = rowData[idx]);
        rows.push(row);
    }
    stmt.free();

    const docsByUrl = new Map();
    for (const row of rows) {
        if (!docsByUrl.has(row.url)) {
            docsByUrl.set(row.url, {
                url: row.url,
                title: row.title,
                category: row.category,
                chunks: []
            });
        }
        docsByUrl.get(row.url).chunks.push(row);
    }

    const scoredDocs = [];
    for (const doc of docsByUrl.values()) {
        let docHits = 0;
        let totalFreq = 0;

        const combinedLower = doc.chunks.map(c => c.content_lower).join(' ');

        for (const term of searchTerms) {
            if (combinedLower.includes(term)) {
                docHits++;
                totalFreq += (combinedLower.split(term).length - 1);
            }
        }

        const density = docHits / searchTerms.length;
        console.log(`Doc ${doc.url} -> Hits: ${docHits}/${searchTerms.length}, Freq: ${totalFreq}, Density: ${density}`);
        scoredDocs.push({
            url: doc.url,
            score: density,
            totalFreq
        });
    }

    console.log("FINAL SCORED DOCS:", scoredDocs);
}

run().catch(console.error);
