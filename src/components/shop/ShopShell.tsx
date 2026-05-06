"use client";

import type { Category } from "@/lib/catalog";
import { useState } from "react";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function ShopShell({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: Category[];
}) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Header categories={categories} onOpenCart={() => setCartOpen(true)} />
      <main
        className="flex-1 transition-[padding-top] duration-200 ease-out"
        style={{ paddingTop: "var(--shop-header-h, 156px)" }}
      >
        {children}
      </main>
      <Footer categories={categories} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
