import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { formatBrl, type Product } from "@/lib/catalog";
import { getCategoryBySlug, getProductById } from "@/lib/data";
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
  try {
    cat = await getCategoryBySlug(product.categorySlug);
  } catch {
    cat = null;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="text-sm text-[#7a6a62]">
        <Link href="/" className="hover:text-[#5c4a42]">
          Início
        </Link>
        {cat && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/categoria/${cat.slug}`} className="hover:text-[#5c4a42]">
              {cat.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-[#5c4a42]">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f0e8e2] shadow-inner">
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
              <div
                className={`absolute inset-0 bg-gradient-to-br ${product.accent}`}
              />
              <div className="relative flex h-full items-center justify-center p-8 text-center">
                <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d3530] sm:text-3xl">
                  {product.name}
                </span>
              </div>
            </>
          )}
        </div>

        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#2c2420] sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-[#5c4a42]">{product.benefit}</p>
          <p className="mt-6 text-2xl font-semibold tabular-nums text-[#5c4a42]">
            {formatBrl(product.price)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <AddToCartButton product={product} label="Adicionar ao carrinho" />
            {cat && (
              <Link
                href={`/categoria/${cat.slug}`}
                className="rounded-xl border border-[#e0d5cd] px-4 py-2.5 text-sm font-medium text-[#5c4a42] hover:bg-[#f5ebe6]"
              >
                Voltar para {cat.name}
              </Link>
            )}
          </div>
          <div className="mt-10 border-t border-[#e8ddd6] pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#9a8a82]">
              Sobre o produto
            </h2>
            <p className="mt-3 leading-relaxed text-[#3d3530]">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
