"use client";

import { type Product } from "@/lib/catalog";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartLine = { product: Product; qty: number };

type CartState = {
  lines: CartLine[];
  add: (product: Product, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  totalQty: number;
  subtotal: number;
};

const CartContext = createContext<CartState | null>(null);

const STORAGE_KEY = "loja-beleza-cart-v2";

function normalizeProduct(raw: unknown): Product | null {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as Record<string, unknown>;
  if (
    typeof p.id !== "string" ||
    typeof p.name !== "string" ||
    typeof p.benefit !== "string" ||
    typeof p.description !== "string" ||
    typeof p.price !== "number" ||
    typeof p.categorySlug !== "string" ||
    typeof p.accent !== "string"
  ) {
    return null;
  }
  return {
    id: p.id,
    name: p.name,
    benefit: p.benefit,
    description: p.description,
    price: p.price,
    categorySlug: p.categorySlug,
    accent: p.accent,
    imageUrl: typeof p.imageUrl === "string" ? p.imageUrl : null,
  };
}

function loadLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    const first = parsed[0];
    if (first && typeof first === "object" && "product" in first) {
      return parsed
        .map((row: unknown) => {
          if (!row || typeof row !== "object") return null;
          const r = row as { product?: unknown; qty?: unknown };
          const product = normalizeProduct(r.product);
          const qty = typeof r.qty === "number" ? Math.floor(r.qty) : 0;
          if (!product || qty < 1) return null;
          return { product, qty: Math.min(99, qty) };
        })
        .filter(Boolean) as CartLine[];
    }

    return [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(loadLines());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const add = useCallback((product: Product, qty = 1) => {
    const q = Math.min(99, Math.max(1, Math.floor(qty)));
    setLines((prev) => {
      const i = prev.findIndex((l) => l.product.id === product.id);
      if (i === -1) return [...prev, { product, qty: q }];
      const next = [...prev];
      next[i] = {
        ...next[i],
        qty: Math.min(99, next[i].qty + q),
      };
      return next;
    });
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    const q = Math.floor(qty);
    if (q < 1) {
      setLines((prev) => prev.filter((l) => l.product.id !== productId));
      return;
    }
    setLines((prev) =>
      prev.map((l) =>
        l.product.id === productId
          ? { ...l, qty: Math.min(99, q) }
          : l
      )
    );
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.product.id !== productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const totalQty = useMemo(
    () => lines.reduce((s, l) => s + l.qty, 0),
    [lines]
  );

  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.product.price * l.qty, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      add,
      setQty,
      remove,
      clear,
      totalQty,
      subtotal,
    }),
    [lines, add, setQty, remove, clear, totalQty, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart dentro de CartProvider");
  return ctx;
}
