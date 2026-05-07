"use client";

import { useSearchParams } from "next/navigation";

export function HeaderSearch({
  className,
  dense,
}: {
  className?: string;
  /** Barra um pouco mais baixa (ex.: header desktop ao rolar). */
  dense?: boolean;
}) {
  const params = useSearchParams();
  const q = params.get("q") ?? "";

  return (
    <form action="/busca" method="get" role="search" className={className}>
      <label htmlFor="header-search" className="sr-only focus:outline-none">
        Buscar produtos
      </label>
      <div
        className={`flex items-stretch overflow-hidden rounded-full border border-[#e3d8cf] bg-white/95 pl-4 shadow-[0_1px_0_rgba(61,47,41,0.04)] transition-[min-height,border-color,box-shadow] duration-300 ease-out focus-within:border-[#c4a69a]/90 focus-within:shadow-[0_0_0_3px_rgba(196,166,154,0.18)] ${
          dense ? "min-h-[2.45rem]" : "min-h-[2.75rem]"
        }`}
      >
        <input
          id="header-search"
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Buscar"
          autoComplete="off"
          enterKeyHint="search"
          className={`header-search-input min-w-0 flex-1 appearance-none border-0 bg-transparent text-sm text-[#3d2f29] placeholder:text-[#a89890]/90 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${
            dense ? "py-1.5" : "py-2"
          }`}
        />
        <button
          type="submit"
          className={`mr-1 flex shrink-0 items-center justify-center rounded-full bg-[#c4a69a] text-white transition hover:bg-[#b8988c] active:scale-[0.98] focus:outline-none focus-visible:outline-none ${
            dense ? "my-0.5 h-8 w-8" : "my-1 h-9 w-9"
          }`}
          aria-label="Buscar"
        >
          <svg
            width={dense ? 16 : 18}
            height={dense ? 16 : 18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </button>
      </div>
    </form>
  );
}
