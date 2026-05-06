"use client";

import { useSearchParams } from "next/navigation";

export function HeaderSearch({ className }: { className?: string }) {
  const params = useSearchParams();
  const q = params.get("q") ?? "";

  return (
    <form action="/busca" method="get" role="search" className={className}>
      <label htmlFor="header-search" className="sr-only">
        Buscar produtos
      </label>
      <div className="flex min-h-[2.75rem] items-stretch overflow-hidden rounded-full border border-[#e3d8cf] bg-white/95 pl-4 shadow-[0_1px_0_rgba(61,47,41,0.04)] transition-[border-color,box-shadow] focus-within:border-[#c4a69a]/90 focus-within:shadow-[0_0_0_3px_rgba(196,166,154,0.18)]">
        <input
          id="header-search"
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Buscar"
          autoComplete="off"
          enterKeyHint="search"
          className="min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-[#3d2f29] placeholder:text-[#a89890]/90 focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          className="my-1 mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c4a69a] text-white transition hover:bg-[#b8988c] active:scale-[0.98]"
          aria-label="Buscar"
        >
          <svg
            width="18"
            height="18"
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
