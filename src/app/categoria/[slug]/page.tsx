import { ProductCard } from "@/components/shop/ProductCard";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let cat = null;
  let list: Awaited<ReturnType<typeof getProductsByCategory>> = [];
  try {
    cat = await getCategoryBySlug(slug);
    if (cat) list = await getProductsByCategory(slug);
  } catch {
    cat = null;
  }
  if (!cat) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="text-sm text-[#7a6a62]">
        <Link href="/" className="hover:text-[#5c4a42]">
          Início
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#5c4a42]">{cat.name}</span>
      </nav>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-[#5c4a42]">
        {cat.name}
      </h1>
      <p className="mt-2 max-w-2xl text-[#7a6a62]">{cat.blurb}</p>

      {list.length === 0 ? (
        <p className="mt-10 text-center text-[#7a6a62]">Em breve novidades nesta categoria.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
