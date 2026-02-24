import initSqlJs from "sql.js";
import { readFileSync, writeFileSync } from "fs";
import os from "os";
import { join } from "path";

async function test() {
    console.log("Starting test...");
    const SQL = await initSqlJs();
    console.log("SQL.js initialized.");

    // 1. Create a DB and schema
    const db1 = new SQL.Database();
    db1.run(`CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT)`);
    db1.run(`INSERT INTO test (name) VALUES ('hello')`);
    console.log("Insert 1 row. Current rows:");
    console.log(db1.exec("SELECT * FROM test"));

    // 2. Export and Save
    const data = db1.export();
    const buffer = Buffer.from(data);
    const TEST_DB = join(os.homedir(), "test-sqljs.db");
    writeFileSync(TEST_DB, buffer);
    console.log(`Saved ${buffer.length} bytes to ${TEST_DB}`);

    // 3. Load from disk
    const buffer2 = readFileSync(TEST_DB);
    const db2 = new SQL.Database(buffer2);
    console.log("Rows after loading from disk:");
    console.log(db2.exec("SELECT * FROM test"));
}

test().catch(console.error);
