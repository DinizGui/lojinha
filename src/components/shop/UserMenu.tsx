"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const iconPerson = (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export function UserMenu({ variant = "default" }: { variant?: "default" | "minimal" }) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const minimal = variant === "minimal";

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  if (status === "loading") {
    return (
      <span
        className={
          minimal
            ? "h-9 w-9 shrink-0 animate-pulse rounded-full bg-[#ede4dc]"
            : "h-9 w-9 animate-pulse rounded-xl bg-[#f0e8e2] sm:w-20"
        }
        aria-hidden
      />
    );
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className={
          minimal
            ? "flex shrink-0 items-center justify-center rounded-full p-2 text-[#5c4a42] transition hover:bg-[#f0e8e2]"
            : "flex items-center gap-1.5 rounded-xl border border-[#e0d5cd] bg-white px-2.5 py-2 text-sm font-medium text-[#5c4a42] transition hover:border-[#c4a69a] sm:px-3"
        }
        aria-label="Entrar"
      >
        {iconPerson}
        {!minimal && <span className="hidden md:inline">Entrar</span>}
      </Link>
    );
  }

  const name = session.user.name ?? session.user.email ?? "";
  const initial = name.trim().charAt(0).toUpperCase();
  const firstName = name.split(/\s+/)[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={
          minimal
            ? "flex shrink-0 items-center justify-center rounded-full p-1.5 text-[#5c4a42] transition hover:bg-[#f0e8e2]"
            : "flex items-center gap-1.5 rounded-xl border border-[#e0d5cd] bg-white px-1.5 py-1.5 text-sm font-medium text-[#5c4a42] transition hover:border-[#c4a69a] sm:gap-2 sm:px-2.5"
        }
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Menu da conta"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#c4a69a] to-[#8b7355] text-xs font-semibold text-white">
          {initial || "?"}
        </span>
        {!minimal && (
          <>
            <span className="hidden max-w-[6rem] truncate md:inline lg:max-w-[8rem]">{firstName}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`hidden transition-transform md:block ${open ? "rotate-180" : ""}`}
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-[#e8ddd6] bg-white shadow-lg ring-1 ring-black/[0.04]"
        >
          <div className="border-b border-[#f0e8e2] px-3 py-2.5">
            <p className="truncate text-sm font-medium text-[#3d2f29]">{name}</p>
            <p className="truncate text-xs text-[#a89890]">{session.user.email}</p>
          </div>
          <Link
            href="/conta"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-[#5c4a42] transition hover:bg-[#faf7f5]"
            role="menuitem"
          >
            Minha conta
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-2 border-t border-[#f0e8e2] px-3 py-2 text-left text-sm text-[#5c4a42] transition hover:bg-[#faf7f5]"
            role="menuitem"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
