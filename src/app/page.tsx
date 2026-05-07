import { HeroProductCards } from "@/components/shop/HeroProductCards";
import { ProductCard } from "@/components/shop/ProductCard";
import { getAllCategories, getFeaturedProducts } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const benefits = [
  {
    title: "Frete grátis",
    text: "Em compras acima de R$ 199 para todo o Brasil.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: "Parcelamento",
    text: "Em até 6× sem juros no cartão de crédito.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    title: "Atendimento humano",
    text: "Falamos com você no WhatsApp, sem robô.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    title: "Curadoria francesa",
    text: "Selecionamos a dedo cada item da prateleira.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 9.91 8.26 3 9.27l5 4.87L6.82 21 12 17.77 17.18 21 16 14.14l5-4.87-6.91-1.01L12 2z" />
      </svg>
    ),
  },
];

const categoryAccents: Record<string, string> = {
  cabelos: "from-[#e8c8b8] via-[#dab39e] to-[#c4a69a]",
  "skin-care": "from-[#f5dcd0] via-[#e8c8b8] to-[#d4b3a3]",
  perfumaria: "from-[#dec0a8] via-[#c4a08a] to-[#a88670]",
  maquiagem: "from-[#e6b8a8] via-[#cc9685] to-[#b07a68]",
  higiene: "from-[#e8d4c4] via-[#d4b8a3] to-[#bc9a85]",
  natural: "from-[#d8c8a8] via-[#bca888] to-[#988570]",
};

function defaultAccent(slug: string) {
  return categoryAccents[slug] ?? "from-[#e8ddd6] via-[#d4c4bb] to-[#b8a399]";
}

export default async function HomePage() {
  let categories: Awaited<ReturnType<typeof getAllCategories>> = [];
  let destaques: Awaited<ReturnType<typeof getFeaturedProducts>> = [];
  try {
    categories = await getAllCategories();
    destaques = await getFeaturedProducts(6);
  } catch {
    /* DATABASE_URL / conexão — páginas permanecem utilizáveis com listas vazias */
  }

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-[#eadad2] bg-[linear-gradient(180deg,#fcf6f3_0%,#f7ebe5_45%,#fffaf7_100%)]">
        <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#e9c7bb]/40 blur-3xl" />
          <div className="absolute right-0 top-24 h-[28rem] w-[28rem] rounded-full bg-[#d9b1a2]/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[#f3ddd4]/50 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_35%)]" />
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden>
          <div className="h-full w-full bg-[linear-gradient(to_right,#8b7355_1px,transparent_1px),linear-gradient(to_bottom,#8b7355_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8 lg:py-28">
          <div className="fade-up flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-[#dbc2b6] bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8b7355] shadow-sm backdrop-blur-sm">
                Nouvelle collection
              </span>
              <span className="inline-flex items-center rounded-full bg-[#f3e1d8] px-3 py-1 text-xs font-medium text-[#7b5f53]">
                Curadoria premium
              </span>
            </div>

            <h1 className="mt-6 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2.4rem,7vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.03em] text-[#3b2b27]">
              Sua rotina de beleza
              <span className="block text-[#8d6f63]">mais elegante, leve</span>
              <span className="block">e sensorial.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#5f4b45] sm:text-lg">
              Descubra uma seleção delicada de skin care, perfumaria, maquiagem e cuidados diários
              pensada para valorizar sua beleza com suavidade, sofisticação e bem-estar.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/categoria/skin-care"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#3b2b27] px-7 py-3.5 text-sm font-medium tracking-wide text-white shadow-lg shadow-[#3b2b27]/15 transition hover:bg-[#59433d] hover:translate-y-[-1px]"
              >
                Explorar coleção
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <Link
                href="/categoria/perfumaria"
                className="inline-flex items-center justify-center rounded-full border border-[#cfb1a4] bg-white/70 px-7 py-3.5 text-sm font-medium text-[#3b2b27] shadow-sm backdrop-blur-sm transition hover:bg-white"
              >
                Ver perfumaria
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9a7d6f]">
                  Fórmulas
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5f4b45]">
                  Texturas leves e ativos que respeitam a pele.
                </p>
              </div>

              <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9a7d6f]">
                  Bem-estar
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5f4b45]">
                  Rituais de autocuidado para todos os dias.
                </p>
              </div>

              <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9a7d6f]">
                  Curadoria
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5f4b45]">
                  Marcas escolhidas com olhar sensível e sofisticado.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#77655f]">
              <div className="flex items-center gap-2">
                <span className="text-[#b08968]">★★★★★</span>
                <span>4.9 de satisfação</span>
              </div>
              <div className="hidden h-5 w-px bg-[#d9c8bf] sm:block" />
              <span>+1.200 clientes encantadas</span>
              <div className="hidden h-5 w-px bg-[#d9c8bf] sm:block" />
              <span>Curadoria desde 2019</span>
            </div>
          </div>

          <div className="fade-up-delay-1 relative">
            <div className="relative mx-auto w-full max-w-[34rem]">
              <div className="absolute -top-3 left-8 z-20 rounded-full border border-white/70 bg-[#fffdfb]/95 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#9a7a68] shadow-[0_12px_40px_-12px_rgba(59,43,39,0.25)] backdrop-blur-md">
                Best seller
              </div>

              <div className="group relative overflow-hidden rounded-[2.25rem] border border-white/55 bg-[radial-gradient(ellipse_95%_75%_at_50%_-5%,#e5c4b6_0%,#c89684_42%,#7d5e54_100%)] p-6 shadow-[0_28px_70px_-20px_rgba(59,43,39,0.22),0_2px_0_rgba(255,255,255,0.35)_inset] transition-shadow duration-500 hover:shadow-[0_36px_90px_-24px_rgba(59,43,39,0.28),0_2px_0_rgba(255,255,255,0.35)_inset] sm:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_12%,rgba(255,255,255,0.5),transparent_32%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,transparent_40%,rgba(45,32,28,0.12)_100%)]" />

                <div className="absolute right-4 top-5 z-10 hidden max-w-[11.5rem] rounded-2xl border border-white/60 bg-white/[0.93] p-3.5 shadow-[0_10px_36px_-14px_rgba(59,43,39,0.18)] backdrop-blur-md md:block">
                  <p className="text-[13px] font-semibold leading-snug text-[#3b2b27]">Sem testes em animais</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#7a6660]">Beleza consciente e delicada.</p>
                </div>

                <div className="relative flex min-h-[24rem] flex-col items-center justify-end pt-6 sm:min-h-[27rem] sm:pt-4">
                  <div className="absolute left-1 top-16 h-48 w-32 rounded-[2rem] bg-white/25 blur-3xl" aria-hidden />
                  <div className="absolute right-0 top-24 h-56 w-36 rounded-[2rem] bg-[#fceee8]/30 blur-3xl" aria-hidden />

                  <HeroProductCards />
                </div>

                <div className="relative mt-5 rounded-[1.35rem] border border-white/70 bg-white/[0.94] p-5 shadow-[0_8px_32px_-18px_rgba(59,43,39,0.12)] backdrop-blur-xl sm:mt-6 sm:rounded-[1.5rem] sm:p-6">
                  <p className="mb-5 flex items-center gap-2 border-b border-[#f3ebe6] pb-4 text-[12px] font-medium text-[#5f4b45] md:hidden">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f1dfd6] text-[11px]" aria-hidden>
                      ✓
                    </span>
                    <span>
                      Sem testes em animais — <span className="font-normal text-[#7a6660]">beleza consciente</span>
                    </span>
                  </p>
                  <div className="grid gap-6 md:grid-cols-[minmax(0,11.5rem)_1fr] md:items-start md:gap-8">
                    <div className="md:border-r md:border-[#efe4dd] md:pr-7">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#b8927a]">
                        Cuidado sensorial
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[#65554e] sm:text-[13px] sm:leading-relaxed">
                        Produtos selecionados para transformar a rotina em um momento de prazer.
                      </p>
                    </div>
                    <div className="relative min-w-0">
                      <div className="absolute right-0 top-0 rounded-full bg-[#f1dfd6] px-3 py-1 text-[11px] font-semibold text-[#8b7355] ring-1 ring-[#e8d5cd]/80">
                        Novo
                      </div>
                      <p className="pr-16 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8b7355]">
                        Em destaque
                      </p>
                      <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold leading-tight text-[#3b2b27] sm:text-[1.35rem]">
                        Ritual de luminosidade
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#6b5c54]">
                        Óleos leves, séruns delicados e fórmulas pensadas para uma pele viçosa e elegante.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* BENEFITS */}
      <section className="border-b border-[#e8ddd6] bg-white">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden bg-[#e8ddd6] px-0 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="flex items-start gap-3 bg-white px-4 py-5 sm:px-6 sm:py-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5ebe6] text-[#8b7355] sm:h-11 sm:w-11">
                {b.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#3d2f29]">{b.title}</p>
                <p className="mt-0.5 text-xs leading-snug text-[#7a6a62] sm:text-sm">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col items-center text-center">
          <span className="ornament">Univers Ma Belle</span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d2f29] sm:mt-4 sm:text-3xl lg:text-4xl">
            Categorias para todo cuidado
          </h2>
          <p className="mt-3 max-w-xl text-sm text-[#7a6a62] sm:text-base">
            Da rotina diária ao ritual especial — encontre o que combina com você.
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="mt-10 text-center text-sm text-[#9a8a82]">
            Nenhuma categoria disponível no momento.
          </p>
        ) : (
          <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {categories.map((c, i) => (
              <li key={c.slug}>
                <Link
                  href={`/categoria/${c.slug}`}
                  className="group relative block h-56 overflow-hidden rounded-3xl border border-[#e8ddd6] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl sm:h-64"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${defaultAccent(c.slug)} transition duration-500 group-hover:scale-105`} aria-hidden />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3d2f29]/65 via-[#3d2f29]/20 to-transparent" aria-hidden />
                  <div className="absolute left-5 top-5 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8b7355] backdrop-blur">
                    0{i + 1}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight">
                      {c.name}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-white/85">
                      {c.blurb}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.25em] text-white/95">
                      Ver produtos
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition group-hover:translate-x-1">
                        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* FEATURED */}
      <section className="border-y border-[#e8ddd6] bg-gradient-to-b from-[#faf6f2] to-[#f5ebe6] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="ornament">Coups de cœur</span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d2f29] sm:text-3xl lg:text-4xl">
                Destaques da casa
              </h2>
            </div>
            <Link
              href="/categoria/perfumaria"
              className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[#8b7355] hover:text-[#5c4a42] hover:underline sm:self-end"
            >
              Ver mais produtos
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {destaques.length === 0 ? (
            <p className="mt-10 text-sm text-[#9a8a82]">Nenhum produto em destaque ainda.</p>
          ) : (
            <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {destaques.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EDITORIAL / About */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#e8c8b8] via-[#c4a08a] to-[#5c4a42] shadow-xl sm:rounded-[2.5rem] lg:max-w-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 px-4 py-3 backdrop-blur sm:inset-x-auto sm:bottom-6 sm:right-6 sm:px-5">
              <p className="font-[family-name:var(--font-display)] text-base italic text-[#3d2f29] sm:text-lg">
                « Élégance et soin »
              </p>
            </div>
          </div>
          <div>
            <span className="ornament">Notre histoire</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d2f29] sm:mt-4 sm:text-3xl lg:text-4xl">
              Beleza francesa, cuidado brasileiro.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5c4a42] sm:mt-5 sm:text-lg">
              Inspirados pelo savoir-faire parisiense, escolhemos cada produto
              pensando em texturas leves, fórmulas honestas e resultados que
              valem a rotina.
            </p>
            <p className="mt-3 text-sm text-[#7a6a62] sm:text-base">
              Mais que uma loja — um pequeno ritual de bem-estar pra cada dia.
            </p>
            <div className="mt-7 grid max-w-md grid-cols-3 gap-3 sm:mt-8 sm:gap-4">
              {[
                { v: "+1k", l: "Clientes" },
                { v: "6", l: "Categorias" },
                { v: "4.9★", l: "Avaliação" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#8b7355] sm:text-3xl">
                    {s.v}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-[#a89890] sm:text-xs">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#3d2f29] text-[#f5ebe6]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-10 text-center sm:flex-row sm:gap-6 sm:px-6 sm:py-12 sm:text-left lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-[#8b7355] sm:h-14 sm:w-14">
              <Image src="/logo.png" alt="" fill sizes="56px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-wide sm:text-2xl">
                Dúvidas? Fale com a gente.
              </p>
              <p className="text-xs text-[#c4a69a] sm:text-sm">
                Atendimento humano via WhatsApp, de seg a sáb.
              </p>
            </div>
          </div>
          <Link
            href="/categoria/skin-care"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f5ebe6] px-6 py-3.5 text-sm font-semibold text-[#3d2f29] transition hover:bg-white sm:w-auto sm:px-7"
          >
            Começar a comprar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
