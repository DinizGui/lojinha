import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="grid min-h-[calc(100vh-9rem)] lg:grid-cols-2">
      {/* Decorative panel */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#dab39e] via-[#c4a08a] to-[#5c4a42] lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -top-20 -left-16 h-80 w-80 rounded-full bg-[#3d2f29]/20 blur-3xl" />

        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Link href="/" className="inline-flex w-fit items-center gap-3" aria-label="Início">
            <span className="relative inline-block h-12 w-12 overflow-hidden rounded-full ring-1 ring-white/40">
              <Image src="/logo.png" alt="" fill sizes="48px" className="object-cover" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[0.22em]">
                MA BELLE
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.45em] text-white/80">
                Paris
              </span>
            </span>
          </Link>

          <div>
            <p className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight italic">
              « Le luxe, c&apos;est <br /> de prendre soin <br /> de soi. »
            </p>
            <p className="mt-6 max-w-xs text-sm text-white/80">
              Sua conta guarda pedidos, favoritos e o seu jeito de cuidar.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-white/85">
            <div className="flex -space-x-2">
              <div className="h-8 w-8 rounded-full border-2 border-white bg-[#e8c8b8]" />
              <div className="h-8 w-8 rounded-full border-2 border-white bg-[#c4a08a]" />
              <div className="h-8 w-8 rounded-full border-2 border-white bg-[#8b7355]" />
            </div>
            <p>+1.200 clientes nos amam ★★★★★</p>
          </div>
        </div>
      </aside>

      {/* Form */}
      <div className="flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mx-auto mb-6 flex w-fit items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#8b7355] hover:text-[#3d2f29] lg:hidden"
          >
            <span className="relative inline-block h-9 w-9 overflow-hidden rounded-full ring-1 ring-[#e0d5cd]">
              <Image src="/logo.png" alt="" fill sizes="36px" className="object-cover" />
            </span>
            Ma Belle Paris
          </Link>

          <span className="ornament">Bienvenue</span>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[#3d2f29] sm:text-4xl">
            Entrar na sua conta
          </h1>
          <p className="mt-2 text-sm text-[#7a6a62]">
            Acompanhe pedidos, favoritos e suas escolhas.
          </p>

          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>

          <p className="mt-6 text-center text-sm text-[#7a6a62]">
            Ainda não tem conta?{" "}
            <Link
              href="/cadastro"
              className="font-medium text-[#3d2f29] underline decoration-[#c4a69a] underline-offset-4 hover:text-[#5c4a42]"
            >
              Criar uma conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
