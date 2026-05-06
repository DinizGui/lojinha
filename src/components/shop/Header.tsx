"use client";

import type { Category } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { getStoreName } from "@/lib/config";
import { UserMenu } from "@/components/shop/UserMenu";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [navOpen]);

  return (
    <header className="sticky top-0 z-40">
      {/* Top announcement bar */}
      <div className="bg-[#3d2f29] text-[#f5ebe6]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.25em] sm:justify-between">
          <p className="text-center">
            ✦ Frete grátis acima de R$ 199 · Parcelamos em até 6×
          </p>
          <p className="hidden text-[#c4a69a] sm:block">
            Atendimento exclusivo via WhatsApp
          </p>
        </div>
      </div>

      <div
        className={`border-b border-[#e8ddd6] bg-[#faf6f2]/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_20px_-12px_rgba(60,40,30,0.18)]" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:py-5">
          <button
            type="button"
            className="rounded-lg p-2 -ml-2 text-[#5c4a42] transition hover:bg-[#f0e8e2] lg:hidden"
            onClick={() => setNavOpen((o) => !o)}
            aria-expanded={navOpen}
            aria-label="Abrir menu de categorias"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {navOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>

          <Link
            href="/"
            className="group flex items-center gap-3 text-[#5c4a42] transition-opacity hover:opacity-90 lg:gap-3.5"
            aria-label={`Início — ${storeName}`}
          >
            <span className="relative inline-block h-12 w-12 overflow-hidden rounded-full ring-1 ring-[#e0d5cd] transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
              <Image
                src="/logo.png"
                alt=""
                fill
                priority
                sizes="56px"
                className="object-cover"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[0.22em] text-[#3d2f29] sm:text-2xl">
                MA BELLE
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.45em] text-[#a89890]">
                Paris
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#5c4a42] transition hover:bg-[#f0e8e2]"
            >
              Início
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/categoria/${c.slug}`}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#5c4a42] transition hover:bg-[#f0e8e2]"
              >
                {c.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <UserMenu />
            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 rounded-xl border border-[#e0d5cd] bg-white px-3 py-2 text-sm font-medium text-[#5c4a42] transition hover:border-[#c4a69a] hover:shadow-sm"
              aria-label={`Abrir carrinho${totalQty > 0 ? ` (${totalQty} itens)` : ""}`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="hidden sm:inline">Carrinho</span>
              {totalQty > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#8b7355] px-1.5 text-[11px] font-semibold text-white shadow-sm">
                  {totalQty > 99 ? "99+" : totalQty}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {navOpen && (
        <>
          <button
            type="button"
            aria-label="Fechar menu"
            className="fixed inset-0 z-30 bg-[#3d2f29]/40 backdrop-blur-sm lg:hidden"
            onClick={() => setNavOpen(false)}
          />
          <div className="absolute left-0 right-0 z-40 border-t border-[#e8ddd6] bg-[#faf6f2] shadow-lg lg:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a89890]">
                Categorias
              </p>
              <ul className="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
                <li>
                  <Link
                    href="/"
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-[#3d2f29] transition hover:bg-[#f0e8e2]"
                    onClick={() => setNavOpen(false)}
                  >
                    <span className="font-medium">Início</span>
                    <span className="text-[#c4a69a]">→</span>
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/categoria/${c.slug}`}
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-[#3d2f29] transition hover:bg-[#f0e8e2]"
                      onClick={() => setNavOpen(false)}
                    >
                      <span className="font-medium">{c.name}</span>
                      <span className="text-[#c4a69a]">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
