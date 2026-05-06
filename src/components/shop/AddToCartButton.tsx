"use client";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/catalog";
import { useState } from "react";

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
  const [pulse, setPulse] = useState(false);

  function handleClick() {
    add(product, 1);
    setPulse(true);
    window.setTimeout(() => setPulse(false), 600);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-[#3d2f29] px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#5c4a42] hover:shadow-md active:scale-[0.98] ${
        pulse ? "ring-2 ring-[#c4a69a] ring-offset-2 ring-offset-white" : ""
      } ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition group-hover:scale-110"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {label}
    </button>
  );
}
