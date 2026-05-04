import mysql from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var __mysqlPool: mysql.Pool | undefined;
}

function createPool(): mysql.Pool {
  const url = process.env.DATABASE_URL;
  if (!url?.trim()) {
    throw new Error("Configure DATABASE_URL (MySQL) no .env.local");
  }
  return mysql.createPool(url.trim());
}

export function getPool(): mysql.Pool {
  if (!globalThis.__mysqlPool) {
    globalThis.__mysqlPool = createPool();
  }
  return globalThis.__mysqlPool;
}
