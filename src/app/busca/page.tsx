import { ProductCard } from "@/components/shop/ProductCard";
import { searchProducts } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  let products: Awaited<ReturnType<typeof searchProducts>> = [];
  try {
    if (query) products = await searchProducts(query);
  } catch {
    products = [];
  }

  return (
    <div>
      <section className="border-b border-[#e8ddd6] bg-[#faf6f2]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <nav className="text-xs text-[#5c4a42]/80 sm:text-sm">
            <Link href="/" className="transition hover:text-[#3d2f29]">
              Início
            </Link>
            <span className="mx-2 text-[#c4a69a]">/</span>
            <span className="font-medium text-[#3d2f29]">Busca</span>
          </nav>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[#3d2f29] sm:text-3xl">
            {query ? (
              <>
                Resultados para “<span className="text-[#5c4a42]">{query}</span>”
              </>
            ) : (
              "Buscar produtos"
            )}
          </h1>
          {!query ? (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5c4a42]/90">
              Use a barra de busca no topo da página para encontrar perfumes, cremes e mais.
            </p>
          ) : (
            <p className="mt-3 text-sm text-[#5c4a42]/85">
              {products.length}{" "}
              {products.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        {!query ? null : products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#e8ddd6] bg-white/60 px-6 py-14 text-center">
            <p className="text-[#5c4a42]">Nenhum produto encontrado para essa busca.</p>
            <Link
              href="/"
              className="mt-4 inline-block text-sm font-medium text-[#8b7355] underline-offset-4 hover:underline"
            >
              Voltar ao início
            </Link>
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
