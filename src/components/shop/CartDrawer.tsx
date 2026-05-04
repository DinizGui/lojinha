"use client";

import { useCart } from "@/context/CartContext";
import { formatBrl } from "@/lib/catalog";
import { whatsappUrlWithText } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

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

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lines, setQty, remove, subtotal, clear } = useCart();

  const whatsappHref = useMemo(() => {
    if (lines.length === 0) return "";
    return whatsappUrlWithText(buildOrderMessage(lines, subtotal));
  }, [lines, subtotal]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
        aria-label="Fechar carrinho"
        onClick={onClose}
      />
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[#e8ddd6] bg-[#faf7f5] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="flex items-center justify-between border-b border-[#e8ddd6] px-4 py-4">
          <h2 id="cart-title" className="text-lg font-semibold text-[#2c2420]">
            Carrinho
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#7a6a62] hover:bg-[#f0e8e2]"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {lines.length === 0 ? (
            <p className="text-center text-sm text-[#7a6a62]">Seu carrinho está vazio.</p>
          ) : (
            <ul className="space-y-4">
              {lines.map(({ product, qty }) => (
                <li
                  key={product.id}
                  className="flex gap-3 rounded-xl border border-[#e8ddd6] bg-white p-3"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#f0e8e2]">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div
                        className={`h-full w-full bg-gradient-to-br ${product.accent}`}
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/produto/${product.id}`}
                      className="font-medium text-[#2c2420] hover:underline"
                      onClick={onClose}
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm tabular-nums text-[#5c4a42]">
                      {formatBrl(product.price)} × {qty}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <label className="sr-only" htmlFor={`qty-${product.id}`}>
                        Quantidade
                      </label>
                      <input
                        id={`qty-${product.id}`}
                        type="number"
                        min={1}
                        max={99}
                        value={qty}
                        onChange={(e) =>
                          setQty(product.id, Number.parseInt(e.target.value, 10) || 1)
                        }
                        className="w-16 rounded border border-[#e0d5cd] px-2 py-1 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="text-sm text-[#a89890] underline"
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
          <div className="border-t border-[#e8ddd6] bg-white/90 px-4 py-4">
            <div className="flex justify-between text-[#2c2420]">
              <span>Subtotal</span>
              <span className="font-semibold tabular-nums">{formatBrl(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-[#9a8a82]">
              Envie o pedido pelo WhatsApp para combinarmos pagamento e entrega.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-[#25D366] py-3 text-center text-sm font-medium text-white hover:bg-[#20bd5a]"
              >
                Pedir no WhatsApp
              </a>
              <button
                type="button"
                onClick={clear}
                className="text-center text-sm text-[#7a6a62] underline"
              >
                Limpar carrinho
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
