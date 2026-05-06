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
      <section className="relative overflow-hidden border-b border-[#e8ddd6] bg-gradient-to-b from-[#f5ebe6] via-[#f5ebe6] to-[#faf6f2]">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#dab39e]/30 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#e8c8b8]/40 blur-3xl" aria-hidden />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-28">
          <div className="fade-up flex flex-col justify-center">
            <span className="ornament">Nouvelle collection</span>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] text-[#3d2f29] sm:text-5xl lg:text-6xl">
              Beleza com <em className="not-italic text-[#8b7355]">charme</em>
              <br />
              de Paris.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#5c4a42]">
              Cabelos, skin care, perfumaria, maquiagem, higiene e linha natural —
              uma curadoria delicada para cuidar de você por inteiro.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/categoria/skin-care"
                className="group inline-flex items-center gap-2 rounded-full bg-[#3d2f29] px-7 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-[#5c4a42] hover:shadow-lg"
              >
                Explorar coleção
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/categoria/perfumaria"
                className="inline-flex items-center gap-2 rounded-full border border-[#c4a69a] bg-white/60 px-7 py-3.5 text-sm font-medium text-[#3d2f29] backdrop-blur-sm transition hover:bg-white"
              >
                Perfumaria
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-[#7a6a62]">
              <div className="flex items-center gap-2">
                <span className="text-[#8b7355]">★★★★★</span>
                <span>4.9 · +1.200 clientes</span>
              </div>
              <div className="hidden h-6 w-px bg-[#d4c4bb] sm:block" />
              <span className="hidden sm:inline">Curadoria desde 2019</span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="fade-up-delay-1 relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#dab39e] via-[#c4a08a] to-[#8b7355] shadow-2xl shadow-[#3d2f29]/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 p-5 backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8b7355]">
                  Em destaque
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[#3d2f29]">
                  Ritual de skin care francês
                </p>
                <p className="mt-1 text-sm text-[#7a6a62]">
                  Texturas leves, fórmulas que respeitam a pele.
                </p>
              </div>
              <div className="absolute -top-3 -right-3 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8b7355] shadow-lg">
                Novo
              </div>
            </div>
            {/* Floating chip */}
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-[#e8ddd6] bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5ebe6]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b7355" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#3d2f29]">Cuidado com você</p>
                  <p className="text-[11px] text-[#7a6a62]">Sem testes em animais</p>
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
              className="flex items-start gap-3 bg-white px-5 py-6 sm:px-6"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5ebe6] text-[#8b7355]">
                {b.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#3d2f29]">{b.title}</p>
                <p className="mt-0.5 text-sm leading-snug text-[#7a6a62]">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="flex flex-col items-center text-center">
          <span className="ornament">Univers Ma Belle</span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-[#3d2f29] sm:text-4xl">
            Categorias para todo cuidado
          </h2>
          <p className="mt-3 max-w-xl text-[#7a6a62]">
            Da rotina diária ao ritual especial — encontre o que combina com você.
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="mt-10 text-center text-sm text-[#9a8a82]">
            Nenhuma categoria disponível no momento.
          </p>
        ) : (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <li key={c.slug}>
                <Link
                  href={`/categoria/${c.slug}`}
                  className="group relative block h-64 overflow-hidden rounded-3xl border border-[#e8ddd6] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl"
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
      <section className="border-y border-[#e8ddd6] bg-gradient-to-b from-[#faf6f2] to-[#f5ebe6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="ornament">Coups de cœur</span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[#3d2f29] sm:text-4xl">
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
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destaques.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EDITORIAL / About */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#e8c8b8] via-[#c4a08a] to-[#5c4a42] shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="absolute bottom-6 right-6 rounded-2xl bg-white/90 px-5 py-3 backdrop-blur">
              <p className="font-[family-name:var(--font-display)] text-lg italic text-[#3d2f29]">
                « Élégance et soin »
              </p>
            </div>
          </div>
          <div>
            <span className="ornament">Notre histoire</span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-[#3d2f29] sm:text-4xl">
              Beleza francesa, cuidado brasileiro.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5c4a42]">
              Inspirados pelo savoir-faire parisiense, escolhemos cada produto
              pensando em texturas leves, fórmulas honestas e resultados que
              valem a rotina.
            </p>
            <p className="mt-4 text-[#7a6a62]">
              Mais que uma loja — um pequeno ritual de bem-estar pra cada dia.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              <div>
                <p className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#8b7355]">
                  +1k
                </p>
                <p className="text-xs uppercase tracking-wider text-[#a89890]">
                  Clientes
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#8b7355]">
                  6
                </p>
                <p className="text-xs uppercase tracking-wider text-[#a89890]">
                  Categorias
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#8b7355]">
                  4.9★
                </p>
                <p className="text-xs uppercase tracking-wider text-[#a89890]">
                  Avaliação
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#3d2f29] text-[#f5ebe6]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-[#8b7355]">
              <Image src="/logo.png" alt="" fill sizes="56px" className="object-cover" />
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-wide">
                Dúvidas? Fale com a gente.
              </p>
              <p className="text-sm text-[#c4a69a]">
                Atendimento humano via WhatsApp, de segunda a sábado.
              </p>
            </div>
          </div>
          <Link
            href="/categoria/skin-care"
            className="inline-flex items-center gap-2 rounded-full bg-[#f5ebe6] px-7 py-3.5 text-sm font-semibold text-[#3d2f29] transition hover:bg-white"
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
