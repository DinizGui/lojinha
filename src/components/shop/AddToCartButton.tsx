"use client";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/catalog";

type Props = {
  product: Product;
  label?: string;
  className?: string;
};

export function AddToCartButton({
  product,
  label = "Adicionar",
  className = "",
}: Props) {
  const { add } = useCart();

  return (
    <button
      type="button"
      onClick={() => add(product, 1)}
      className={`rounded-xl bg-[#8b7355] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#7a6549] ${className}`}
    >
      {label}
    </button>
  );
}
