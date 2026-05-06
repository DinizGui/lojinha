"use client";

import type { Category } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { getStoreName } from "@/lib/config";
import { HeaderSearch } from "@/components/shop/HeaderSearch";
import { UserMenu } from "@/components/shop/UserMenu";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function SearchFallback({ className }: { className?: string }) {
  return (
    <div
      className={`h-[2.75rem] w-full rounded-full border border-[#e3d8cf] bg-white/50 ${className ?? ""}`}
      aria-hidden
    />
  );
}

export function Header({
  categories,
  onOpenCart,
}: {
  categories: Category[];
  onOpenCart: () => void;
}) {
  const pathname = usePathname();
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

  function navLinkClass(href: string, exact?: boolean) {
    const active = exact
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
    return [
      "inline-flex min-h-[2.5rem] max-w-[11rem] items-center justify-center rounded-lg px-3 py-2 text-center text-[11px] font-medium leading-snug tracking-wide text-[#6b5c54] transition sm:max-w-[12rem] sm:px-3.5 sm:text-xs",
      active ? "text-[#3d2f29]" : "hover:bg-[#f3ebe5]/80 hover:text-[#3d2f29]",
    ].join(" ");
  }

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-[#3d2f29] text-[#f5ebe6]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] sm:gap-6 sm:px-4 sm:text-[11px] sm:tracking-[0.22em] sm:justify-between">
          <p className="truncate text-center">
            ✦ Frete grátis acima de R$ 199 · Parcelamos em 6×
          </p>
          <p className="hidden text-[#c4a69a] sm:block">Atendimento via WhatsApp</p>
        </div>
      </div>

      <div
        className={`border-b border-[#e8ddd6] bg-[#faf6f2]/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_20px_-12px_rgba(60,40,30,0.12)]" : ""
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-4 sm:pt-4 lg:px-5 lg:pt-5 focus:outline-none">
          {/* Linha 1: logo + utilitários (mobile); desktop inclui busca no grid implícito via segunda linha full-width não — faremos logo | search row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 lg:flex-none lg:gap-4">
              <button
                type="button"
                className="-ml-1 shrink-0 rounded-full p-2 text-[#5c4a42] transition hover:bg-[#f0e8e2] lg:hidden"
                onClick={() => setNavOpen((o) => !o)}
                aria-expanded={navOpen}
                aria-label="Abrir menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {navOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
                  )}
                </svg>
              </button>

              <Link
                href="/"
                className="group flex min-w-0 items-center gap-2 text-[#5c4a42] transition-opacity hover:opacity-90 sm:gap-2.5 lg:gap-3"
                aria-label={`Início — ${storeName}`}
              >
                <span className="relative inline-block h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-[#e0d5cd]/90 transition-transform duration-300 group-hover:scale-[1.03] sm:h-11 sm:w-11 lg:h-12 lg:w-12">
                  <Image
                    src="/logo.png"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 640px) 36px, 48px"
                    className="object-cover"
                  />
                </span>
                <span className="hidden min-w-0 flex-col leading-none sm:flex">
                  <span className="truncate font-[family-name:var(--font-display)] text-[0.95rem] font-semibold tracking-[0.14em] text-[#3d2f29] sm:text-lg sm:tracking-[0.18em]">
                    MA BELLE
                  </span>
                  <span className="mt-0.5 truncate text-[8px] font-medium uppercase tracking-[0.32em] text-[#a89890] sm:text-[9px] sm:tracking-[0.38em]">
                    Paris
                  </span>
                </span>
              </Link>
            </div>

            <div className="hidden flex-1 justify-center px-4 lg:flex">
              <Suspense fallback={<SearchFallback className="max-w-md" />}>
                <HeaderSearch className="w-full max-w-md xl:max-w-lg" />
              </Suspense>
            </div>

            <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
              <UserMenu variant="minimal" />
              <button
                type="button"
                onClick={onOpenCart}
                className="relative flex shrink-0 items-center justify-center rounded-full p-2 text-[#5c4a42] transition hover:bg-[#f0e8e2] cursor-pointer"
                aria-label={`Abrir carrinho${totalQty > 0 ? ` (${totalQty} itens)` : ""}`}
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.35}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {totalQty > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#8b7355] px-1 text-[10px] font-semibold text-white">
                    {totalQty > 99 ? "99+" : totalQty}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Busca mobile / tablet */}
          <div className="mt-3 lg:hidden">
            <Suspense fallback={<SearchFallback />}>
              <HeaderSearch className="w-full" />
            </Suspense>
          </div>

          {/* Linha 2: categorias — estilo menu editorial, espaçado */}
          <nav
            className="mt-5 hidden border-t border-[#ece3dc] pb-4 pt-4 lg:block"
            aria-label="Categorias da loja"
          >
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 xl:gap-x-10">
              <li>
                <Link href="/" className={navLinkClass("/", true)}>
                  Início
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/categoria/${c.slug}`} className={navLinkClass(`/categoria/${c.slug}`, true)}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {navOpen && (
        <>
          <button
            type="button"
            aria-label="Fechar menu"
            className="fixed inset-0 z-30 bg-[#3d2f29]/35 backdrop-blur-[2px] lg:hidden"
            onClick={() => setNavOpen(false)}
          />
          <div className="absolute left-0 right-0 z-40 border-t border-[#e8ddd6] bg-[#faf6f2] shadow-lg lg:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a89890]">Menu</p>
                <ul className="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
                  <li>
                    <Link
                      href="/"
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-[#3d2f29] transition hover:bg-[#f0e8e2]"
                      onClick={() => setNavOpen(false)}
                    >
                      <span>Início</span>
                      <span className="text-[#c4a69a]">→</span>
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/categoria/${c.slug}`}
                        className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-[#3d2f29] transition hover:bg-[#f0e8e2]"
                        onClick={() => setNavOpen(false)}
                      >
                        <span>{c.name}</span>
                        <span className="text-[#c4a69a]">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
