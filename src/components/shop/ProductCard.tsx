import { formatBrl, type Product } from "@/lib/catalog";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#e8ddd6] bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/produto/${product.id}`} className="relative block aspect-square overflow-hidden bg-[#f0e8e2]">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${product.accent} opacity-90 transition group-hover:opacity-100`}
              aria-hidden
            />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[#3d3530] drop-shadow-sm">
                {product.name}
              </span>
            </div>
          </>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/produto/${product.id}`} className="hover:underline">
          <h3 className="text-[15px] font-medium text-[#2c2420]">{product.name}</h3>
        </Link>
        <p className="text-sm text-[#7a6a62] line-clamp-2">{product.benefit}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="text-base font-semibold tabular-nums text-[#5c4a42]">
            {formatBrl(product.price)}
          </span>
          <AddToCartButton product={product} label="Ao carrinho" />
        </div>
      </div>
    </article>
  );
}
