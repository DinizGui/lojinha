import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { ProductCard } from "@/components/shop/ProductCard";
import { formatBrl, type Product } from "@/lib/catalog";
import { getCategoryBySlug, getProductById, getProductsByCategory } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let product: Product | null = null;
  try {
    product = await getProductById(id);
  } catch {
    product = null;
  }
  if (!product) notFound();

  let cat = null;
  let related: Product[] = [];
  try {
    cat = await getCategoryBySlug(product.categorySlug);
    if (cat) {
      const all = await getProductsByCategory(cat.slug);
      related = all.filter((p) => p.id !== product!.id).slice(0, 3);
    }
  } catch {
    cat = null;
  }

  const installments = (product.price / 6).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div>
      {/* Top breadcrumb strip */}
      <div className="border-b border-[#e8ddd6] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4">
          <nav className="flex flex-wrap items-center text-xs text-[#7a6a62] sm:text-sm">
            <Link href="/" className="hover:text-[#3d2f29]">
              Início
            </Link>
            {cat && (
              <>
                <span className="mx-1.5 text-[#c4a69a] sm:mx-2">/</span>
                <Link href={`/categoria/${cat.slug}`} className="hover:text-[#3d2f29]">
                  {cat.name}
                </Link>
              </>
            )}
            <span className="mx-1.5 text-[#c4a69a] sm:mx-2">/</span>
            <span className="line-clamp-1 font-medium text-[#3d2f29]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product detail */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          {/* Image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f5ebe6] shadow-lg shadow-[#3d2f29]/5 sm:rounded-[2rem]">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.accent}`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.4),transparent_60%)]" />
                  <div className="relative flex h-full items-center justify-center p-10 text-center">
                    <span className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[#3d2f29] sm:text-4xl">
                      {product.name}
                    </span>
                  </div>
                </>
              )}
              <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8b7355] backdrop-blur sm:left-4 sm:top-4 sm:px-3">
                ✦ Curadoria
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {cat && (
              <Link
                href={`/categoria/${cat.slug}`}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f5ebe6] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b7355] hover:bg-[#ebdcd1] sm:text-xs"
              >
                {cat.name}
              </Link>
            )}
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.875rem,7vw,3rem)] font-semibold leading-tight text-[#2c2420] sm:mt-4">
              {product.name}
            </h1>
            <p className="mt-2 text-base text-[#5c4a42] sm:mt-3 sm:text-lg">{product.benefit}</p>

            <div className="mt-2 flex items-center gap-2 text-sm text-[#7a6a62]">
              <span className="text-[#8b7355]">★★★★★</span>
              <span>4.9 · 87 avaliações</span>
            </div>

            <div className="mt-6 rounded-2xl border border-[#e8ddd6] bg-white p-5 shadow-sm sm:mt-7 sm:p-6">
              <p className="text-3xl font-semibold tabular-nums text-[#3d2f29] sm:text-4xl">
                {formatBrl(product.price)}
              </p>
              <p className="mt-1 text-sm text-[#7a6a62]">
                ou 6× de <span className="font-medium text-[#5c4a42]">{installments}</span> sem juros
              </p>
              <p className="mt-1 text-xs text-[#8b7355]">
                ✓ Frete grátis acima de R$ 199
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <AddToCartButton
                  product={product}
                  label="Adicionar ao carrinho"
                  className="w-full sm:w-auto"
                />
                <Link
                  href="#descricao"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#e0d5cd] px-5 py-3 text-sm font-medium text-[#5c4a42] hover:bg-[#faf6f2] sm:w-auto"
                >
                  Mais detalhes
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Trust badges */}
            <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:mt-6 sm:grid-cols-3 sm:gap-3">
              {[
                { t: "Envio rápido", s: "Postagem em 1 dia útil" },
                { t: "Pagamento seguro", s: "Cartão, Pix ou boleto" },
                { t: "Trocas fáceis", s: "Em até 7 dias" },
              ].map((b) => (
                <li
                  key={b.t}
                  className="rounded-xl border border-[#e8ddd6] bg-white px-4 py-3 text-center"
                >
                  <p className="text-sm font-semibold text-[#3d2f29]">{b.t}</p>
                  <p className="mt-0.5 text-xs text-[#7a6a62]">{b.s}</p>
                </li>
              ))}
            </ul>

            <div id="descricao" className="mt-8 border-t border-[#e8ddd6] pt-6 sm:mt-10 sm:pt-8">
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a89890] sm:text-[11px]">
                Sobre o produto
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#3d3530] sm:mt-4 sm:text-base">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-[#e8ddd6] bg-gradient-to-b from-[#faf6f2] to-[#f5ebe6] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="ornament">Vous aimerez aussi</span>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d2f29] sm:text-3xl">
                  Você também vai gostar
                </h2>
              </div>
              {cat && (
                <Link
                  href={`/categoria/${cat.slug}`}
                  className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[#8b7355] hover:underline sm:self-end"
                >
                  Ver toda categoria
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )}
            </div>
            <div className="mt-7 grid gap-5 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
