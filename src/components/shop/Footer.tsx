import { getStoreName, getWhatsAppDigits } from "@/lib/config";
import type { Category } from "@/lib/catalog";
import Image from "next/image";
import Link from "next/link";

export function Footer({ categories }: { categories: Category[] }) {
  const name = getStoreName();
  const wa = getWhatsAppDigits();

  return (
    <footer className="mt-auto border-t border-[#e8ddd6] bg-gradient-to-b from-[#f5ebe6] to-[#ebdcd1]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3" aria-label={name}>
              <span className="relative inline-block h-14 w-14 overflow-hidden rounded-full ring-1 ring-[#d4c4bb]">
                <Image
                  src="/logo.png"
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[0.22em] text-[#3d2f29]">
                  MA BELLE
                </span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.45em] text-[#a89890]">
                  Paris
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#7a6a62]">
              Beleza, elegância e bem-estar — com o charme de Paris. Cuidado de
              verdade pra cada detalhe da sua rotina.
            </p>
          </div>

          {/* Categories */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a89890]">
              Categorias
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.length === 0 ? (
                <li className="text-[#9a8a82]">Em breve</li>
              ) : (
                categories.slice(0, 6).map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/categoria/${c.slug}`}
                      className="text-[#5c4a42] transition hover:text-[#3d2f29] hover:underline"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Account */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a89890]">
              Sua conta
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/login" className="text-[#5c4a42] transition hover:text-[#3d2f29] hover:underline">
                  Entrar
                </Link>
              </li>
              <li>
                <Link href="/cadastro" className="text-[#5c4a42] transition hover:text-[#3d2f29] hover:underline">
                  Criar conta
                </Link>
              </li>
              <li>
                <Link href="/conta" className="text-[#5c4a42] transition hover:text-[#3d2f29] hover:underline">
                  Minha conta
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a89890]">
              Atendimento
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2 text-[#5c4a42]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-[#a89890]">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <a
                  href={`https://wa.me/${wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#3d2f29] hover:underline"
                >
                  WhatsApp · pedidos e dúvidas
                </a>
              </li>
              <li className="flex items-start gap-2 text-[#5c4a42]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-[#a89890]">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
                <span>contato@mabelleparis.com</span>
              </li>
              <li className="flex items-start gap-2 text-[#5c4a42]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-[#a89890]">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Seg a Sáb · 9h às 19h</span>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-2">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4c4bb] bg-white/70 text-[#5c4a42] transition hover:border-[#8b7355] hover:text-[#3d2f29]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4c4bb] bg-white/70 text-[#5c4a42] transition hover:border-[#8b7355] hover:text-[#3d2f29]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#d4c4bb]/60 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-[#7a6a62] sm:flex-row">
            <p>© {new Date().getFullYear()} {name} · Todos os direitos reservados.</p>
            <p className="text-[#a89890]">
              Feito com cuidado · Curitiba · Brasil
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
