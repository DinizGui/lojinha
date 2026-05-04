import { getPool } from "@/lib/db";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export async function POST(req: Request) {
  let body: { email?: string; password?: string; name?: string; phone?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const name = String(body.name ?? "").trim();
  const phone = body.phone ? String(body.phone).trim() : null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Senha precisa ter ao menos 6 caracteres" }, { status: 400 });
  }
  if (name.length < 2) {
    return NextResponse.json({ error: "Informe seu nome" }, { status: 400 });
  }

  const pool = getPool();
  const [existing] = await pool.query<RowDataPacket[]>(
    "SELECT id FROM customers WHERE email = ? LIMIT 1",
    [email]
  );
  if (existing.length > 0) {
    return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 });
  }

  const hash = await bcrypt.hash(password, 12);
  const id = nanoid(24);
  await pool.query<ResultSetHeader>(
    "INSERT INTO customers (id, email, password_hash, name, phone) VALUES (?, ?, ?, ?, ?)",
    [id, email, hash, name, phone]
  );

  return NextResponse.json({ ok: true, id });
}
