import initSqlJs from "sql.js";
import { readFileSync } from "fs";
import os from "os";
import { join } from "path";
const DB_PATH = join(os.homedir(), ".unified-sf-docs-mcp", "salesforce-docs.db");
const SQL = await initSqlJs();
const db = new SQL.Database(readFileSync(DB_PATH));
const res = db.exec("SELECT url FROM documents");
console.log(JSON.stringify(res, null, 2));
