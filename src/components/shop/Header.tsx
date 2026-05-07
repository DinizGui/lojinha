"use client";

import type { Category } from "@/lib/catalog";
import { useCart } from "@/context/CartContext";
import { getStoreName } from "@/lib/config";
import { HeaderSearch } from "@/components/shop/HeaderSearch";
import { UserMenu } from "@/components/shop/UserMenu";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

function SearchFallback({ className }: { className?: string }) {
  return (
    <div
      className={`h-[2.75rem] w-full rounded-full border border-[#e3d8cf] bg-white/50 ${className ?? ""}`}
      aria-hidden
    />
  );
}

function ChevronNav() {
  return (
    <svg
      className="h-[18px] w-[18px] shrink-0 text-[#c4a69a]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/** Mesmo traço e tamanho do botão dentro de `HeaderSearch`. */
function SearchBarGlyph() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.35}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
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
  const [narrowViewport, setNarrowViewport] = useState(false);
  const sheetTouchStartY = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const compactMobile = narrowViewport && scrolled;
  /** Desktop (lg+): ao rolar, header mais baixo — mesma ideia do mobile compacto. */
  const compactDesktop = !narrowViewport && scrolled;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    function sync() {
      setNarrowViewport(mq.matches);
    }
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    function publishHeight() {
      const el = headerRef.current;
      if (!el) return;
      const h = Math.ceil(el.getBoundingClientRect().height);
      root.style.setProperty("--shop-header-h", `${h}px`);
    }
    publishHeight();
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(publishHeight);
    ro.observe(el);
    window.addEventListener("resize", publishHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", publishHeight);
      root.style.removeProperty("--shop-header-h");
    };
  }, []);

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [navOpen]);

  useEffect(() => {
    if (!navOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setNavOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen]);

  function onSheetTouchStart(e: React.TouchEvent) {
    sheetTouchStartY.current = e.touches[0].clientY;
  }
  function onSheetTouchEnd(e: React.TouchEvent) {
    if (sheetTouchStartY.current == null) return;
    const dy = e.changedTouches[0].clientY - sheetTouchStartY.current;
    if (dy > 48) setNavOpen(false);
    sheetTouchStartY.current = null;
  }

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
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-40 w-full max-w-none"
    >
      <div
        className={`overflow-hidden bg-[#3d2f29] text-[#f5ebe6] transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          compactDesktop ? "pointer-events-none max-h-0 opacity-0" : "max-h-24 opacity-100"
        }`}
      >
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
        <div
          className={`mx-auto max-w-7xl px-4 transition-[padding] duration-300 ease-out sm:px-5 lg:px-5 ${
            compactMobile
              ? "pb-2 pt-2 sm:px-5"
              : compactDesktop
                ? "pb-0 pt-4 sm:pt-4 lg:pb-2 lg:pt-2"
                : "pb-0 pt-4 sm:pt-4 lg:pb-0 lg:pt-5"
          }`}
        >
          {/* Linha 1: mobile compacto ao rolar; desktop compacto ao rolar (padding menor + logo menor) */}
          <div className="relative flex min-h-[52px] items-center justify-between gap-2 sm:min-h-0 lg:min-h-0 lg:gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-3 lg:flex-none lg:gap-4">
              <button
                type="button"
                id="mobile-menu-trigger"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#3d2f29] transition-colors hover:bg-[#f0e8e2] active:bg-[#e8ddd6] lg:hidden"
                onClick={() => setNavOpen((o) => !o)}
                aria-expanded={navOpen}
                aria-controls="mobile-navigation"
                aria-label={navOpen ? "Fechar menu" : "Abrir menu"}
              >
                <svg className="h-[22px] w-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  {navOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.65} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.65} d="M5 7h14M5 12h14M5 17h14" />
                  )}
                </svg>
              </button>

              <Link
                href="/"
                className="group flex min-w-0 items-center gap-2.5 text-[#5c4a42] transition-opacity hover:opacity-90 sm:gap-2.5 lg:gap-3"
                aria-label={`Início — ${storeName}`}
              >
                <span
                  className={`relative inline-block h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-[#e0d5cd]/90 transition-[transform,width,height] duration-300 ease-out group-hover:scale-[1.03] sm:h-11 sm:w-11 ${
                    compactDesktop ? "lg:h-10 lg:w-10" : "lg:h-12 lg:w-12"
                  }`}
                >
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
                <HeaderSearch className="w-full max-w-md xl:max-w-lg" dense={compactDesktop} />
              </Suspense>
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
              <Link
                href="/busca"
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c4a69a] text-white transition hover:bg-[#b8988c] active:scale-[0.98] focus:outline-none focus-visible:outline-none lg:hidden ${
                  compactMobile ? "flex" : "hidden"
                }`}
                aria-label="Buscar produtos"
              >
                <SearchBarGlyph />
              </Link>
              <UserMenu variant="minimal" />
              <button
                type="button"
                onClick={onOpenCart}
                className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#3d2f29] transition-colors hover:bg-[#f0e8e2] active:bg-[#e8ddd6]"
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

          {/* Busca mobile / tablet — some ao rolar no celular (substituída pelo ícone na linha de cima) */}
          <div
            className={`lg:hidden transition-[margin,opacity] duration-300 ${
              compactMobile ? "mt-0 max-h-0 overflow-hidden opacity-0 pointer-events-none pb-0" : "mt-5 max-h-[120px] pb-5 opacity-100"
            }`}
          >
            <Suspense fallback={<SearchFallback />}>
              <HeaderSearch className="w-full" />
            </Suspense>
          </div>

          {/* Linha 2: categorias — recolhe no desktop ao rolar (animação suave) */}
          <nav
            aria-hidden={compactDesktop}
            className={`hidden overflow-hidden border-[#ece3dc] transition-[max-height,opacity,margin,padding,border-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:block ${
              compactDesktop
                ? "pointer-events-none mt-0 max-h-0 border-t-transparent py-0 opacity-0 lg:mt-0"
                : "mt-5 max-h-[min(50vh,560px)] border-t pb-4 pt-4 opacity-100"
            }`}
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

      {/* Overlay + bottom sheet (sobe da base; fecha deslizando para baixo) */}
      <button
        type="button"
        aria-label="Fechar menu"
        aria-hidden={!navOpen}
        tabIndex={navOpen ? 0 : -1}
        className={`fixed inset-0 z-[100] bg-[#3d2f29]/45 backdrop-blur-[3px] transition-opacity duration-[320ms] ease-out lg:hidden ${
          navOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setNavOpen(false)}
      />

      <div
        className={`fixed inset-x-0 bottom-0 z-[101] flex max-h-[100dvh] flex-col justify-end lg:hidden ${
          navOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <nav
          id="mobile-navigation"
          aria-hidden={!navOpen}
          aria-labelledby="mobile-nav-heading"
          className={`flex max-h-[min(88dvh,720px)] flex-col overflow-hidden rounded-t-[1.35rem] border border-b-0 border-[#e8ddd6] bg-[#faf6f2] shadow-[0_-16px_56px_-20px_rgba(61,47,41,0.28)] transition-transform duration-[320ms] ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform sm:rounded-t-3xl ${
            navOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Área superior: alça + título (swipe para baixo fecha) */}
          <div
            className="shrink-0 touch-pan-y px-4 pb-3 pt-2 sm:px-5"
            onTouchStart={onSheetTouchStart}
            onTouchEnd={onSheetTouchEnd}
          >
            <div className="flex justify-center pb-3 pt-1" aria-hidden>
              <div className="h-1.5 w-[3.25rem] rounded-full bg-[#cfc4bc]/95" />
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-[#ece3dc] pb-4">
              <div>
                <p id="mobile-nav-heading" className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a89890]">
                  Navegar
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-[#3d2f29]">
                  MA BELLE
                </p>
              </div>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#5c4a42] transition hover:bg-[#f0e8e2]"
                onClick={() => setNavOpen(false)}
                aria-label="Fechar menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mobile-nav-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-1 sm:px-5">
            <ul className="flex flex-col gap-2.5 pb-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-[#ece3dc] bg-white/80 px-4 py-3.5 text-[15px] font-medium text-[#3d2f29] shadow-sm transition hover:border-[#d4c4bb] hover:bg-white active:scale-[0.99]"
                  onClick={() => setNavOpen(false)}
                >
                  <span>Início</span>
                  <ChevronNav />
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categoria/${c.slug}`}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-[#ece3dc] bg-white/80 px-4 py-3.5 text-[15px] font-medium leading-snug text-[#3d2f29] shadow-sm transition hover:border-[#d4c4bb] hover:bg-white active:scale-[0.99]"
                    onClick={() => setNavOpen(false)}
                  >
                    <span className="min-w-0 flex-1">{c.name}</span>
                    <ChevronNav />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
