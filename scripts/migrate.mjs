import mysql from "mysql2/promise";
import fs from "node:fs";
import path from "node:path";

const file = process.argv[2];
if (!file) {
  console.error("uso: node scripts/migrate.mjs <arquivo-sql>");
  process.exit(1);
}

const url = process.env.DATABASE_URL;
if (!url) {
  const dotenv = fs.readFileSync(".env", "utf8");
  const m = dotenv.match(/DATABASE_URL\s*=\s*"?([^"\n]+)"?/);
  if (!m) throw new Error("DATABASE_URL não encontrada");
  process.env.DATABASE_URL = m[1].trim();
}

const sql = fs.readFileSync(path.resolve(file), "utf8");
const conn = await mysql.createConnection({ uri: process.env.DATABASE_URL, multipleStatements: true });
try {
  await conn.query(sql);
  console.log("OK", file);
} finally {
  await conn.end();
}
