import { formatBrl, type Product } from "@/lib/catalog";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#e8ddd6] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/produto/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-[#f5ebe6]"
        aria-label={product.name}
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${product.accent} transition duration-500 group-hover:scale-105`}
              aria-hidden
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.35),transparent_60%)]" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <span className="font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-[#3d2f29] drop-shadow-sm">
                {product.name}
              </span>
            </div>
          </>
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b7355] backdrop-blur">
          ✦ Curadoria
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link href={`/produto/${product.id}`} className="block hover:underline">
          <h3 className="text-base font-medium leading-snug text-[#2c2420]">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm leading-relaxed text-[#7a6a62] line-clamp-2">
          {product.benefit}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a89890]">
              A partir de
            </p>
            <p className="text-lg font-semibold tabular-nums text-[#3d2f29]">
              {formatBrl(product.price)}
            </p>
          </div>
          <AddToCartButton product={product} label="Carrinho" className="px-4 py-2.5" />
        </div>
      </div>
    </article>
  );
}
