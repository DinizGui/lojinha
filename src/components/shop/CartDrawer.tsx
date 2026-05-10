"use client";

import { useCart } from "@/context/CartContext";
import { formatBrl } from "@/lib/catalog";
import { whatsappUrlWithText } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";

function buildOrderMessage(
  lines: { product: { name: string; price: number }; qty: number }[],
  subtotal: number
): string {
  const linhas = lines.map(
    (l) =>
      `• ${l.product.name} × ${l.qty} — ${formatBrl(l.product.price * l.qty)}`
  );
  return [
    "Olá! Quero pedir pelo site:",
    "",
    ...linhas,
    "",
    `Subtotal: ${formatBrl(subtotal)}`,
  ].join("\n");
}

const FREE_SHIPPING = 199;

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lines, setQty, remove, subtotal, clear, totalQty } = useCart();

  const whatsappHref = useMemo(() => {
    if (lines.length === 0) return "";
    return whatsappUrlWithText(buildOrderMessage(lines, subtotal));
  }, [lines, subtotal]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const remainingForFree = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  return (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-50 bg-[#3d2f29]/45 backdrop-blur-[3px] transition-[opacity,backdrop-filter] duration-[320ms] ease-out motion-reduce:transition-none ${
          open ? "opacity-100" : "pointer-events-none opacity-0 backdrop-blur-0"
        }`}
        aria-label="Fechar carrinho"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col overflow-hidden border-l border-[#e8ddd6] bg-[#faf6f2] shadow-[0_24px_80px_-24px_rgba(61,47,41,0.35)] transition-transform duration-[420ms] ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform motion-reduce:transition-none ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-hidden={!open}
        aria-labelledby="cart-title"
        inert={!open ? true : undefined}
      >
        {/* Header */}
        <div className="relative border-b border-[#e8ddd6] bg-white/85 px-5 py-4 backdrop-blur">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_18%_0%,rgba(232,200,184,0.36),transparent_55%)]" aria-hidden />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a89890]">
                Mon panier
              </p>
              <h2
                id="cart-title"
                className="mt-0.5 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d2f29]"
              >
                Carrinho{totalQty > 0 ? ` · ${totalQty}` : ""}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-[#5c4a42] transition hover:bg-[#f0e8e2]"
              aria-label="Fechar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Free shipping progress */}
          {lines.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-[#5c4a42]">
                {remainingForFree > 0 ? (
                  <>
                    Faltam <span className="font-semibold tabular-nums text-[#8b7355]">{formatBrl(remainingForFree)}</span> para o frete grátis ✨
                  </>
                ) : (
                  <span className="font-semibold text-[#8b7355]">✓ Você ganhou frete grátis!</span>
                )}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#ebdcd1]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#c4a08a] to-[#8b7355] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f5ebe6] text-[#8b7355]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <p className="mt-4 font-[family-name:var(--font-display)] text-xl text-[#3d2f29]">
                Seu carrinho está vazio
              </p>
              <p className="mt-1 max-w-xs text-sm text-[#7a6a62]">
                Comece adicionando algum produto da nossa curadoria.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 rounded-full border border-[#c4a69a] bg-white px-5 py-2.5 text-sm font-medium text-[#3d2f29] transition hover:bg-[#faf6f2]"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map(({ product, qty }) => (
                <li
                  key={product.id}
                  className="group flex gap-3 rounded-2xl border border-[#e8ddd6] bg-white p-3 transition hover:border-[#c4a69a]"
                >
                  <Link
                    href={`/produto/${product.id}`}
                    onClick={onClose}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f5ebe6]"
                  >
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className={`h-full w-full bg-gradient-to-br ${product.accent}`} />
                    )}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/produto/${product.id}`}
                      className="line-clamp-2 text-sm font-medium text-[#3d2f29] hover:underline"
                      onClick={onClose}
                    >
                      {product.name}
                    </Link>
                    <p className="mt-0.5 text-sm font-semibold tabular-nums text-[#5c4a42]">
                      {formatBrl(product.price * qty)}
                      {qty > 1 && (
                        <span className="ml-1 text-xs font-normal text-[#a89890]">
                          ({formatBrl(product.price)} × {qty})
                        </span>
                      )}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-[#e0d5cd] bg-[#faf6f2]">
                        <button
                          type="button"
                          onClick={() => setQty(product.id, Math.max(1, qty - 1))}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[#5c4a42] hover:bg-[#f0e8e2]"
                          aria-label="Diminuir"
                        >
                          −
                        </button>
                        <span className="min-w-[1.75rem] text-center text-sm font-medium tabular-nums text-[#3d2f29]">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(product.id, Math.min(99, qty + 1))}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[#5c4a42] hover:bg-[#f0e8e2]"
                          aria-label="Aumentar"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="text-xs text-[#a89890] underline-offset-2 hover:text-[#5c4a42] hover:underline"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-[#e8ddd6] bg-white/95 px-5 py-5 backdrop-blur">
            <dl className="space-y-1.5 text-sm text-[#5c4a42]">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">{formatBrl(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Frete</dt>
                <dd className="tabular-nums">
                  {remainingForFree === 0 ? (
                    <span className="font-semibold text-[#8b7355]">Grátis</span>
                  ) : (
                    <span className="text-[#a89890]">a calcular</span>
                  )}
                </dd>
              </div>
              <div className="mt-3 flex justify-between border-t border-dashed border-[#e8ddd6] pt-3 text-base text-[#3d2f29]">
                <dt className="font-semibold">Total</dt>
                <dd className="font-semibold tabular-nums">{formatBrl(subtotal)}</dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-col gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-semibold text-white transition hover:bg-[#1da851] hover:shadow-md"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z" />
                </svg>
                Finalizar no WhatsApp
              </a>
              <button
                type="button"
                onClick={clear}
                className="text-center text-xs text-[#a89890] underline-offset-2 hover:text-[#5c4a42] hover:underline"
              >
                Esvaziar carrinho
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
