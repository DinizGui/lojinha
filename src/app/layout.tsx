import { ShopShell } from "@/components/shop/ShopShell";
import { CartProvider } from "@/context/CartContext";
import { getAllCategories } from "@/lib/data";
import { getStoreName } from "@/lib/config";
import type { Category } from "@/lib/catalog";
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const store = getStoreName();

export const metadata: Metadata = {
  title: store ? `${store} — Loja` : "Loja",
  description: "Loja de beleza e bem-estar — cabelos, perfumaria, skin care e mais",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let categoryNav: Category[] = [];
  try {
    categoryNav = await getAllCategories();
  } catch {
    categoryNav = [];
  }

  return (
    <html
      lang="pt-BR"
      className={`${dmSans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#faf7f5] font-sans text-[#2c2420]">
        <CartProvider>
          <ShopShell categories={categoryNav}>{children}</ShopShell>
        </CartProvider>
      </body>
    </html>
  );
}
