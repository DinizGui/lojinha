"use client";

import type { Category } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { getStoreName } from "@/lib/config";
import { UserMenu } from "@/components/shop/UserMenu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header({
  categories,
  onOpenCart,
}: {
  categories: Category[];
  onOpenCart: () => void;
}) {
  const storeName = getStoreName();
  const { totalQty } = useCart();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#e8ddd6] bg-[#faf7f5]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-2.5 text-[#5c4a42] transition-opacity hover:opacity-90"
          aria-label={`Início — ${storeName}`}
        >
          <span className="relative inline-block h-11 w-11 overflow-hidden rounded-full ring-1 ring-[#e0d5cd] transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12">
            <Image
              src="/logo.png"
              alt=""
              fill
              priority
              sizes="48px"
              className="object-cover"
            />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-[family-name:var(--font-display)] text-base font-semibold tracking-[0.18em] text-[#3d2f29] sm:text-lg">
              MA BELLE
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#a89890]">
              Paris
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="rounded-lg px-3 py-2 text-sm text-[#5c4a42] transition hover:bg-[#f0e8e2]"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg p-2 text-[#5c4a42] lg:hidden"
            onClick={() => setNavOpen((o) => !o)}
            aria-expanded={navOpen}
            aria-label="Abrir menu de categorias"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {navOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <UserMenu />
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center gap-2 rounded-xl border border-[#e0d5cd] bg-white px-3 py-2 text-sm font-medium text-[#5c4a42] transition hover:border-[#c4a69a]"
          >
            <span aria-hidden>🛒</span>
            <span className="hidden sm:inline">Carrinho</span>
            {totalQty > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#8b7355] px-1 text-xs text-white">
                {totalQty > 99 ? "99+" : totalQty}
              </span>
            )}
          </button>
        </div>
      </div>

      {navOpen && (
        <div className="border-t border-[#e8ddd6] bg-[#faf7f5] px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categoria/${c.slug}`}
                  className="block rounded-lg px-3 py-2 text-[#5c4a42]"
                  onClick={() => setNavOpen(false)}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
