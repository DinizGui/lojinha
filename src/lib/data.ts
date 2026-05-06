import type { Category, Product } from "@/lib/catalog";
import { getPool } from "@/lib/db";

type CategoryRow = { slug: string; name: string; blurb: string };
type ProductRow = {
  id: string;
  category_slug: string;
  name: string;
  benefit: string;
  description: string;
  price: string | number;
  accent: string;
  image_url: string | null;
};

function mapProduct(r: ProductRow): Product {
  return {
    id: r.id,
    categorySlug: r.category_slug,
    name: r.name,
    benefit: r.benefit,
    description: r.description,
    price: Number(r.price),
    accent: r.accent,
    imageUrl: r.image_url,
  };
}

export async function getAllCategories(): Promise<Category[]> {
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT slug, name, blurb FROM categories ORDER BY name ASC"
  );
  return (rows as CategoryRow[]).map((r) => ({
    slug: r.slug,
    name: r.name,
    blurb: r.blurb,
  }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT slug, name, blurb FROM categories WHERE slug = ? LIMIT 1",
    [slug]
  );
  const r = (rows as CategoryRow[])[0];
  if (!r) return null;
  return { slug: r.slug, name: r.name, blurb: r.blurb };
}

export async function getProductById(id: string): Promise<Product | null> {
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT id, category_slug, name, benefit, description, price, accent, image_url FROM products WHERE id = ? LIMIT 1",
    [id]
  );
  const r = (rows as ProductRow[])[0];
  if (!r) return null;
  return mapProduct(r);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const pool = getPool();
  const [rows] = await pool.query(
    `SELECT id, category_slug, name, benefit, description, price, accent, image_url
     FROM products WHERE category_slug = ? ORDER BY name ASC`,
    [categorySlug]
  );
  return (rows as ProductRow[]).map(mapProduct);
}

export async function getFeaturedProducts(limit: number): Promise<Product[]> {
  const pool = getPool();
  const safe = Math.min(100, Math.max(1, Math.floor(limit)));
  const [rows] = await pool.query(
    `SELECT id, category_slug, name, benefit, description, price, accent, image_url
     FROM products ORDER BY updated_at DESC LIMIT ?`,
    [safe]
  );
  return (rows as ProductRow[]).map(mapProduct);
}

/** Busca simples por nome, benefício ou descrição (LIKE). */
export async function searchProducts(rawQuery: string): Promise<Product[]> {
  const clean = rawQuery.trim().replace(/[%_\\]/g, "").slice(0, 80);
  if (!clean) return [];
  const pool = getPool();
  const pattern = `%${clean}%`;
  const [rows] = await pool.query(
    `SELECT id, category_slug, name, benefit, description, price, accent, image_url
     FROM products
     WHERE name LIKE ? OR benefit LIKE ? OR description LIKE ?
     ORDER BY name ASC
     LIMIT 48`,
    [pattern, pattern, pattern]
  );
  return (rows as ProductRow[]).map(mapProduct);
}
