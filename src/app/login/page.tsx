import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { AuthPanel } from "./AuthPanel";

export const dynamic = "force-dynamic";

const benefits = [
  "Acompanhe seus pedidos com facilidade",
  "Salve favoritos para comprar depois",
  "Finalize compras com mais rapidez",
];

export default function LoginPage() {
  return (
    <div className="relative min-h-[calc(100vh-8rem)] overflow-hidden bg-[linear-gradient(180deg,#fcf6f3_0%,#f8ede7_45%,#fffaf7_100%)]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#e9c7bb]/35 blur-3xl" />
        <div className="absolute right-0 top-24 h-[28rem] w-[28rem] rounded-full bg-[#d9b1a2]/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[#f3ddd4]/45 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-20">
        <section className="fade-up flex flex-col justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Início">
              <span className="relative inline-block h-11 w-11 overflow-hidden rounded-full ring-1 ring-[#e2d5ce]">
                <Image src="/logo.png" alt="" fill sizes="44px" className="object-cover" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[0.22em] text-[#3d2f29]">
                  MA BELLE
                </span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.45em] text-[#8b7355]">
                  Paris
                </span>
              </span>
            </Link>

            <div className="mt-10 max-w-xl">
              <span className="inline-flex items-center rounded-full border border-[#eadfd8] bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8b7355] backdrop-blur-sm">
                Espace Client
              </span>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.25rem,7vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.03em] text-[#3d2f29]">
                Sua conta com a mesma elegância da loja.
              </h1>
              <p className="mt-5 text-base leading-8 text-[#5f4b45] sm:text-lg">
                Entre ou crie a sua conta em uma única página, com uma experiência mais fluida,
                sofisticada e alinhada ao visual premium da Ma Belle.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:max-w-xl sm:grid-cols-3">
              {[
                { label: "Pedidos", text: "Veja o histórico da sua jornada de compras." },
                { label: "Favoritos", text: "Guarde produtos para explorar com calma." },
                { label: "Praticidade", text: "Compre mais rápido nas próximas visitas." },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={index === 0 ? "fade-up" : index === 1 ? "fade-up-delay-1" : "fade-up-delay-2"}
                >
                  <div className="rounded-2xl border border-white/70 bg-white/72 p-4 shadow-sm backdrop-blur-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9a7d6f]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#5f4b45]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up-delay-2 mt-10 rounded-[2rem] border border-white/70 bg-white/58 p-5 shadow-[0_20px_60px_-32px_rgba(61,47,41,0.22)] backdrop-blur-md sm:max-w-xl sm:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8b7355]">
              Vantagens da conta
            </p>
            <ul className="mt-4 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm text-[#4f3f39]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5ebe6] text-[#8b7355]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-xl">
            <Suspense fallback={null}>
              <AuthPanel />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  );
}
