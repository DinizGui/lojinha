import { ProductCard } from "@/components/shop/ProductCard";
import { getAllCategories, getFeaturedProducts } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let categories: Awaited<ReturnType<typeof getAllCategories>> = [];
  let destaques: Awaited<ReturnType<typeof getFeaturedProducts>> = [];
  try {
    categories = await getAllCategories();
    destaques = await getFeaturedProducts(6);
  } catch {
    /* DATABASE_URL / conexão — páginas permanecem utilizáveis com listas vazias */
  }

  return (
    <div>
      <section className="border-b border-[#e8ddd6] bg-[#f5ebe6]">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
          <p className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[#5c4a42] sm:text-4xl">
            Beleza e bem-estar
          </p>
          <p className="mx-auto mt-3 max-w-xl text-[#7a6a62]">
            Sua loja de beleza e bem-estar — cabelos, perfumaria, skin care, higiene,
            maquiagem e linha natural.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/categoria/cabelos"
              className="rounded-full bg-[#8b7355] px-6 py-3 text-sm font-medium text-white hover:bg-[#7a6549]"
            >
              Ver cabelos
            </Link>
            <Link
              href="/categoria/skin-care"
              className="rounded-full border border-[#c4a69a] bg-white px-6 py-3 text-sm font-medium text-[#5c4a42] hover:bg-[#faf7f5]"
            >
              Skin care
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#5c4a42]">
          Categorias
        </h2>
        {categories.length === 0 ? (
          <p className="mt-6 text-sm text-[#9a8a82]">Nenhuma categoria disponível no momento.</p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categoria/${c.slug}`}
                  className="block rounded-2xl border border-[#e8ddd6] bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <span className="text-lg font-medium text-[#2c2420]">{c.name}</span>
                  <p className="mt-1 text-sm text-[#7a6a62]">{c.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="border-t border-[#e8ddd6] bg-[#faf7f5] py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#5c4a42]">
              Destaques
            </h2>
            <Link href="/categoria/perfumaria" className="text-sm font-medium text-[#8b7355] hover:underline">
              Ver mais produtos
            </Link>
          </div>
          {destaques.length === 0 ? (
            <p className="mt-8 text-sm text-[#9a8a82]">Nenhum produto em destaque ainda.</p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destaques.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
