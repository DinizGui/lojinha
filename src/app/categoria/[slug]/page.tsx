import { ProductCard } from "@/components/shop/ProductCard";
import { getAllCategories, getCategoryBySlug, getProductsByCategory } from "@/lib/data";
import type { Category } from "@/lib/catalog";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const accents: Record<string, string> = {
  cabelos: "from-[#e8c8b8] via-[#dab39e] to-[#c4a69a]",
  "skin-care": "from-[#f5dcd0] via-[#e8c8b8] to-[#d4b3a3]",
  perfumaria: "from-[#dec0a8] via-[#c4a08a] to-[#a88670]",
  maquiagem: "from-[#e6b8a8] via-[#cc9685] to-[#b07a68]",
  higiene: "from-[#e8d4c4] via-[#d4b8a3] to-[#bc9a85]",
  natural: "from-[#d8c8a8] via-[#bca888] to-[#988570]",
};

function accent(slug: string) {
  return accents[slug] ?? "from-[#e8ddd6] via-[#d4c4bb] to-[#b8a399]";
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let cat = null;
  let list: Awaited<ReturnType<typeof getProductsByCategory>> = [];
  let allCats: Category[] = [];
  try {
    cat = await getCategoryBySlug(slug);
    if (cat) list = await getProductsByCategory(slug);
    allCats = await getAllCategories();
  } catch {
    cat = null;
  }
  if (!cat) notFound();

  const others = allCats.filter((c) => c.slug !== cat.slug).slice(0, 6);

  return (
    <div>
      {/* Hero header */}
      <section className={`relative overflow-hidden border-b border-[#e8ddd6] bg-gradient-to-br ${accent(cat.slug)}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_60%)]" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#3d2f29]/10" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <nav className="text-sm text-[#3d2f29]/70">
            <Link href="/" className="hover:text-[#3d2f29]">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-[#3d2f29]">{cat.name}</span>
          </nav>
          <div className="mt-6 max-w-2xl">
            <span className="ornament text-[#3d2f29]/70">Catégorie</span>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight text-[#3d2f29] sm:text-5xl">
              {cat.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-[#3d2f29]/85">
              {cat.blurb}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-[#3d2f29] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8b7355]" />
              {list.length} {list.length === 1 ? "produto" : "produtos"}
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        {list.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#e8ddd6] bg-white/60 px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f5ebe6] text-[#8b7355]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
            <p className="font-[family-name:var(--font-display)] text-xl text-[#3d2f29]">
              Em breve, novidades por aqui.
            </p>
            <p className="mt-2 text-sm text-[#7a6a62]">
              Estamos preparando uma seleção especial pra essa categoria.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-full border border-[#c4a69a] bg-white px-5 py-2.5 text-sm font-medium text-[#3d2f29] hover:bg-[#faf6f2]"
            >
              Voltar para o início
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Other categories */}
      {others.length > 0 && (
        <section className="border-t border-[#e8ddd6] bg-white py-14">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a89890]">
              Continue explorando
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d2f29]">
              Outras categorias
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {others.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categoria/${c.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[#e0d5cd] bg-[#faf6f2] px-4 py-2 text-sm font-medium text-[#3d2f29] transition hover:border-[#8b7355] hover:bg-white"
                  >
                    {c.name}
                    <span className="text-[#c4a69a]">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
