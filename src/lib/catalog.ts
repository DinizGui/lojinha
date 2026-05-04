export type Category = {
  slug: string;
  name: string;
  blurb: string;
};

export type Product = {
  id: string;
  name: string;
  benefit: string;
  description: string;
  price: number;
  categorySlug: string;
  /** Fallback quando não há foto (classes Tailwind gradient) */
  accent: string;
  imageUrl: string | null;
};

export function formatBrl(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
