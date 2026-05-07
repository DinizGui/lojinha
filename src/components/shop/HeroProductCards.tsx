"use client";

import { useEffect, useMemo, useState } from "react";

const INTERVAL_MS = 5200;

type ShowcaseProduct = {
  brand: string;
  name: string;
  subtitle: string;
  category: string;
  note: string;
  accent: string;
  bottleClassName: string;
  sideClassName: string;
};

const PRODUCTS: ShowcaseProduct[] = [
  {
    brand: "NUXE Paris",
    name: "Huile Prodigieuse",
    subtitle: "Or Florale",
    category: "Multi-uso seco",
    note: "7 oleos botanicos com brilho acetinado e toque leve.",
    accent: "from-[#fff8f3] via-[#f0ddd1] to-[#d7b09a]",
    bottleClassName: "from-[#fffdfb] via-[#f4e7df] to-[#ddb6a7]",
    sideClassName: "from-[#fffaf7] to-[#edd8cf]",
  },
  {
    brand: "Avene",
    name: "Cicalfate+",
    subtitle: "Creme Reparateur",
    category: "Reparacao calmante",
    note: "Cuidado frances para conforto da pele sensibilizada.",
    accent: "from-[#fffdf9] via-[#f4e7dc] to-[#e2bfab]",
    bottleClassName: "from-[#fffdfc] via-[#f7ebe3] to-[#e9c6b4]",
    sideClassName: "from-[#fffaf8] to-[#efddd4]",
  },
  {
    brand: "Bioderma",
    name: "Sensibio",
    subtitle: "Eau Micellaire",
    category: "Limpeza delicada",
    note: "Micelar iconica para remover maquiagem com suavidade.",
    accent: "from-[#fffaf8] via-[#f2dfd8] to-[#d6b0a5]",
    bottleClassName: "from-[#fffefd] via-[#f6e9e3] to-[#dfbbb0]",
    sideClassName: "from-[#fff9f7] to-[#ecd6cf]",
  },
];

const SLOT_POSITIONS = [
  "left-[2%] z-[1] h-[12.25rem] w-[5.4rem] translate-y-6 rounded-[1.65rem] opacity-70 sm:left-[4%] sm:h-[14.25rem] sm:w-[7.5rem] sm:translate-y-8 sm:rounded-[1.95rem]",
  "left-1/2 z-[3] h-[18.75rem] w-[11.75rem] -translate-x-1/2 rounded-[2.55rem] sm:h-[21rem] sm:w-[14rem] sm:rounded-[2.85rem]",
  "left-[98%] z-[1] h-[12.25rem] w-[5.4rem] -translate-x-full translate-y-6 rounded-[1.65rem] opacity-70 sm:left-[96%] sm:h-[14.25rem] sm:w-[7.5rem] sm:translate-y-8 sm:rounded-[1.95rem]",
] as const;

const INITIAL_SLOT_FOR_PRODUCT: [number, number, number] = [1, 2, 0];

function modulo(value: number, length: number) {
  return (value + length) % length;
}

function slotForProduct(productIndex: number, step: number) {
  return modulo(INITIAL_SLOT_FOR_PRODUCT[productIndex] + step, PRODUCTS.length);
}

function ProductBottle({
  product,
  center,
}: {
  product: ShowcaseProduct;
  center: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden border border-white/55 bg-gradient-to-b ${center ? product.bottleClassName : product.sideClassName} ${
        center
          ? "h-full w-full rounded-[inherit] shadow-[0_22px_55px_-18px_rgba(59,43,39,0.38),inset_0_1px_0_rgba(255,255,255,0.8)]"
          : "h-full w-full rounded-[inherit] shadow-[0_18px_48px_-20px_rgba(59,43,39,0.28),inset_0_1px_0_rgba(255,255,255,0.75)]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_14%,rgba(255,255,255,0.92),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(100,66,56,0.12)_100%)]" />
      {center ? (
        <>
          <div className="absolute left-1/2 top-5 h-[3.4rem] w-[4.8rem] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#fcf7f3,#ebddd4)] shadow-[inset_0_2px_4px_rgba(255,255,255,0.9)] ring-1 ring-[#ebddd6]" />
          <div className="absolute inset-x-[12%] top-[5.8rem] text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-[#a17f70]">
              {product.brand}
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-[1.55rem] font-semibold leading-none tracking-[-0.03em] text-[#342622] sm:text-[1.8rem]">
              {product.name}
            </p>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#8d7468]">
              {product.subtitle}
            </p>
          </div>
          <div className="absolute bottom-4 left-4 right-4 rounded-[1.2rem] border border-white/75 bg-white/72 px-3 py-3 backdrop-blur-md">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a88676]">
              {product.category}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-[#65554e]">
              {product.note}
            </p>
          </div>
        </>
      ) : (
        <div className="flex h-full flex-col justify-end px-2.5 pb-4 pt-10 text-center sm:px-3 sm:pb-5 sm:pt-12">
          <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#a17f70]">
            {product.brand}
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-sm font-semibold leading-tight text-[#342622] sm:text-base">
            {product.name}
          </p>
        </div>
      )}
    </div>
  );
}

export function HeroProductCards() {
  const [step, setStep] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = window.setInterval(() => {
      setStep((current) => modulo(current + 1, PRODUCTS.length));
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion]);

  const featuredIndex = useMemo(
    () => PRODUCTS.findIndex((_, index) => slotForProduct(index, step) === 1),
    [step],
  );
  const featuredProduct = PRODUCTS[featuredIndex];

  const transition = reducedMotion
    ? "none"
    : "left 900ms cubic-bezier(0.22, 1, 0.36, 1), transform 900ms cubic-bezier(0.22, 1, 0.36, 1), width 900ms cubic-bezier(0.22, 1, 0.36, 1), height 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease, border-radius 900ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 900ms ease";

  function goTo(nextIndex: number) {
    const slot = slotForProduct(nextIndex, step);
    if (slot === 1) return;
    if (slot === 2) {
      setStep((current) => modulo(current + 1, PRODUCTS.length));
      return;
    }
    setStep((current) => modulo(current - 1, PRODUCTS.length));
  }

  function goNext() {
    setStep((current) => modulo(current + 1, PRODUCTS.length));
  }

  function goPrev() {
    setStep((current) => modulo(current - 1, PRODUCTS.length));
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <p className="sr-only" aria-live="polite">
        Destaque do momento: {featuredProduct.brand} - {featuredProduct.name}, {featuredProduct.subtitle}.
      </p>

      <div className="relative mx-auto h-[18.75rem] w-full max-w-[21rem] px-10 sm:h-[21rem] sm:max-w-[26rem] sm:px-12">
        <div
          className={`absolute inset-x-4 top-6 h-[11rem] rounded-full bg-gradient-to-r ${featuredProduct.accent} opacity-75 blur-3xl sm:inset-x-6`}
          aria-hidden
        />

        {PRODUCTS.map((product, productIndex) => {
          const slot = slotForProduct(productIndex, step);
          const center = slot === 1;

          return (
            <button
              key={product.brand}
              type="button"
              aria-label={`Destacar ${product.brand} ${product.name}`}
              aria-pressed={center}
              onClick={() => goTo(productIndex)}
              className={`absolute bottom-0 overflow-hidden border border-white/35 text-left will-change-[left,width,height,transform,opacity] ${SLOT_POSITIONS[slot]} ${
                center ? "cursor-default" : "cursor-pointer"
              }`}
              style={{ transition }}
            >
              <ProductBottle product={product} center={center} />
            </button>
          );
        })}

        <button
          type="button"
          onClick={goPrev}
          aria-label="Produto anterior"
          className="absolute left-0 top-1/2 z-[5] inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/78 text-[#5f4b45] shadow-[0_14px_32px_-18px_rgba(59,43,39,0.35)] backdrop-blur-md transition hover:bg-white sm:h-11 sm:w-11"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label="Proximo produto"
          className="absolute right-0 top-1/2 z-[5] inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/78 text-[#5f4b45] shadow-[0_14px_32px_-18px_rgba(59,43,39,0.35)] backdrop-blur-md transition hover:bg-white sm:h-11 sm:w-11"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-1.5" aria-hidden>
        {PRODUCTS.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            className={`h-1.5 rounded-full transition-[width,background-color] duration-500 ${
              featuredIndex === index ? "w-7 bg-white/90" : "w-1.5 bg-white/35"
            }`}
            aria-label={`Ir para produto ${index + 1}`}
          />
        ))}
      </div>

      <div className="mt-5 text-center sm:mt-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
          Selecao francesa
        </p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-white sm:text-xl">
          {featuredProduct.brand}
        </p>
        <p className="mt-1 text-sm text-white/80">
          {featuredProduct.category} - {featuredProduct.subtitle}
        </p>
      </div>
    </div>
  );
}
