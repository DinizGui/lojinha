import Image from "next/image";
import Link from "next/link";
import { SignupForm } from "./SignupForm";

export const dynamic = "force-dynamic";

export default function CadastroPage() {
  return (
    <div className="grid min-h-[calc(100vh-9rem)] lg:grid-cols-2">
      {/* Form first on mobile, left on desktop */}
      <div className="order-2 flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:order-1">
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

          <span className="ornament">Rejoignez-nous</span>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d2f29] sm:text-3xl lg:text-4xl">
            Crie sua conta
          </h1>
          <p className="mt-2 text-sm text-[#7a6a62]">
            Pra acompanhar pedidos, salvar favoritos e ganhar mimos.
          </p>

          <SignupForm />

          <p className="mt-6 text-center text-sm text-[#7a6a62]">
            Já tem conta?{" "}
            <Link
              href="/login"
              className="font-medium text-[#3d2f29] underline decoration-[#c4a69a] underline-offset-4 hover:text-[#5c4a42]"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>

      {/* Decorative panel */}
      <aside className="relative order-1 hidden overflow-hidden bg-gradient-to-br from-[#f5dcd0] via-[#e8c8b8] to-[#c4a08a] lg:order-2 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.4),transparent_60%)]" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -top-12 -right-20 h-80 w-80 rounded-full bg-[#3d2f29]/15 blur-3xl" />

        <div className="relative flex h-full flex-col justify-between p-12 text-[#3d2f29]">
          <Link href="/" className="inline-flex w-fit items-center gap-3" aria-label="Início">
            <span className="relative inline-block h-12 w-12 overflow-hidden rounded-full ring-1 ring-[#3d2f29]/20">
              <Image src="/logo.png" alt="" fill sizes="48px" className="object-cover" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[0.22em]">
                MA BELLE
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.45em] text-[#5c4a42]">
                Paris
              </span>
            </span>
          </Link>

          <div>
            <p className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight italic">
              « La beauté <br /> commence par <br /> un sourire. »
            </p>
            <p className="mt-6 max-w-xs text-sm text-[#5c4a42]">
              Bem-vinda ao nosso pequeno cantinho parisiense de cuidado.
            </p>
          </div>

          <ul className="space-y-3 text-sm text-[#3d2f29]">
            {[
              "Acompanhe seus pedidos",
              "Salve seus favoritos",
              "Receba novidades em primeira mão",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/70 text-[#8b7355]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
