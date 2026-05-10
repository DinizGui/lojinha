import { ProductCard } from "@/components/shop/ProductCard";
import { getAllCategories, getCategoryBySlug, getProductsByCategory } from "@/lib/data";
import type { Category } from "@/lib/catalog";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const accents: Record<string, string> = {
  cabelos: "from-[#ead1c4] via-[#dcb6a4] to-[#b88e7d]",
  "skin-care": "from-[#f7e2d9] via-[#eac8bb] to-[#cda392]",
  perfumaria: "from-[#ead7c8] via-[#d4b29d] to-[#a9826b]",
  maquiagem: "from-[#efcec3] via-[#dba69a] to-[#b97d73]",
  higiene: "from-[#eadfd6] via-[#d8bfae] to-[#b59280]",
  natural: "from-[#e4d7bf] via-[#ccb79a] to-[#9f876d]",
};

const categoryThemes: Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
    notes: string[];
    spotlight: string;
  }
> = {
  cabelos: {
    eyebrow: "Soin Capillaire",
    title: "Textura, brilho e cuidado do fio à ponta.",
    description:
      "Uma seleção pensada para tratar, nutrir e finalizar com elegância, sem pesar na rotina.",
    notes: ["Nutrição intensa", "Brilho delicado", "Toque sedoso"],
    spotlight: "Rituais que deixam o cabelo mais leve, alinhado e luminoso.",
  },
  "skin-care": {
    eyebrow: "Rituel de Peau",
    title: "Uma rotina de pele com sensorial leve e acabamento sofisticado.",
    description:
      "Da limpeza ao tratamento, reunimos fórmulas que valorizam viço, conforto e cuidado diário.",
    notes: ["Pele viçosa", "Ativos suaves", "Texturas elegantes"],
    spotlight: "Cuidados essenciais para uma pele bem tratada em todas as etapas.",
  },
  perfumaria: {
    eyebrow: "Parfumerie",
    title: "Perfumes e brumas para deixar presença sem exagero.",
    description:
      "Notas envolventes, femininas e delicadas para acompanhar a rotina e ocasiões especiais.",
    notes: ["Notas florais", "Elegância diária", "Assinatura marcante"],
    spotlight: "Fragrâncias que prolongam a sensação de beleza e presença.",
  },
  maquiagem: {
    eyebrow: "Beauté",
    title: "Maquiagem com acabamento refinado e beleza sem esforço.",
    description:
      "Produtos pensados para realçar traços, iluminar a pele e construir visuais leves ou marcantes.",
    notes: ["Acabamento natural", "Cor equilibrada", "Glow sofisticado"],
    spotlight: "Itens para uma maquiagem mais fresca, elegante e versátil.",
  },
  higiene: {
    eyebrow: "Bain & Soin",
    title: "Cuidados diários que transformam o básico em ritual.",
    description:
      "Sabonetes, loções e essenciais para uma rotina de autocuidado mais bonita e agradável.",
    notes: ["Frescor diário", "Conforto da pele", "Rotina delicada"],
    spotlight: "Pequenos cuidados que elevam a sensação de bem-estar todos os dias.",
  },
  natural: {
    eyebrow: "Botanique",
    title: "Beleza com inspiração natural e toque sensível.",
    description:
      "Uma curadoria de itens que privilegia texturas leves, ingredientes inspirados na natureza e bem-estar.",
    notes: ["Inspiração botânica", "Toque leve", "Cuidado gentil"],
    spotlight: "Produtos que aproximam beleza, conforto e naturalidade.",
  },
};

function accent(slug: string) {
  return accents[slug] ?? "from-[#e8ddd6] via-[#d4c4bb] to-[#b8a399]";
}

function getTheme(slug: string, catName: string, blurb: string) {
  return (
    categoryThemes[slug] ?? {
      eyebrow: "Collection",
      title: `${catName} com curadoria delicada e visual contemporâneo.`,
      description: blurb,
      notes: ["Seleção especial", "Curadoria premium", "Beleza cotidiana"],
      spotlight: "Uma seleção pensada para valorizar a sua rotina com mais cuidado e estilo.",
    }
  );
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let cat = null;
  let list: Awaited<ReturnType<typeof getProductsByCategory>> = [];
  let allCats: Category[] = [];

  try {
    cat = await getCategoryBySlug(slug);
    if (cat) list = await getProductsByCategory(slug);
    allCats = await getAllCategories();
  } catch {
    cat = null;
  }

  if (!cat) notFound();

  const theme = getTheme(cat.slug, cat.name, cat.blurb);
  const others = allCats.filter((c) => c.slug !== cat.slug).slice(0, 6);
  const hasProducts = list.length > 0;

  return (
    <div className="bg-[#fffdfa]">
      <section
        className={`fade-in-soft relative isolate overflow-hidden border-b border-[#eadad2] bg-gradient-to-br ${accent(cat.slug)}`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.38),transparent_40%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgba(255,255,255,0.18),transparent_28%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(61,47,41,0.08)_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#8b7355]/10 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-20">
          <div className="fade-up">
            <nav className="flex flex-wrap items-center gap-2 text-xs text-[#3d2f29]/72 sm:text-sm">
              <Link href="/" className="transition hover:text-[#3d2f29]">
                Início
              </Link>
              <span>/</span>
              <span className="font-medium text-[#3d2f29]">{cat.name}</span>
            </nav>

            <div className="mt-6 max-w-3xl">
              <span className="inline-flex items-center rounded-full border border-white/60 bg-white/55 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7d6257] backdrop-blur-sm sm:text-[11px]">
                {theme.eyebrow}
              </span>

              <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2rem,7vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-[#3d2f29]">
                {theme.title}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#4f3f39] sm:text-lg">
                {theme.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                {theme.notes.map((note) => (
                  <span
                    key={note}
                    className="inline-flex items-center rounded-full border border-white/60 bg-white/65 px-4 py-2 text-xs font-medium text-[#5d4942] backdrop-blur-sm"
                  >
                    {note}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#4f3f39]">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-[#8b7355]" />
                  <span>
                    {list.length} {list.length === 1 ? "produto disponível" : "produtos disponíveis"}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2 backdrop-blur-sm">
                  <span className="text-[#8b7355]">★</span>
                  <span>Curadoria premium</span>
                </div>
              </div>
            </div>
          </div>

          <div className="fade-up-delay-1 relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/40 p-5 shadow-[0_24px_80px_-28px_rgba(61,47,41,0.28)] backdrop-blur-md sm:p-6">
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),transparent_40%,rgba(61,47,41,0.04)_100%)]"
                aria-hidden
              />
              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8b7355]">
                  Em destaque
                </p>
                <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight text-[#3d2f29] sm:text-3xl">
                  {cat.name}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#5b4a43] sm:text-[15px]">
                  {theme.spotlight}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9e7f71]">
                      Curadoria
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#5f4b45]">
                      Seleção pensada para oferecer produtos com visual, textura e proposta mais sofisticada.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9e7f71]">
                      Estilo
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#5f4b45]">
                      Uma categoria apresentada de forma mais editorial, elegante e próxima de lojas premium.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/70 bg-[#fffaf7]/70 p-4">
                  <p className="text-xs font-medium text-[#6f5b53]">“{cat.blurb}”</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fade-up-delay-1 border-b border-[#efe4dd] bg-[#fffdfa]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a18f87] sm:text-[11px]">
              Collection
            </p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[#3d2f29] sm:text-2xl">
              {hasProducts ? "Produtos selecionados" : "Categoria em preparação"}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-[#eadfd8] bg-white px-4 py-2 text-xs font-medium text-[#5f4b45]">
              Entrega para todo o Brasil
            </span>
            <span className="inline-flex items-center rounded-full border border-[#eadfd8] bg-white px-4 py-2 text-xs font-medium text-[#5f4b45]">
              Curadoria autoral
            </span>
            <span className="inline-flex items-center rounded-full border border-[#eadfd8] bg-white px-4 py-2 text-xs font-medium text-[#5f4b45]">
              Experiência premium
            </span>
          </div>
        </div>
      </section>

      <section className="fade-up-delay-2 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {hasProducts ? (
          <>
            <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a18f87] sm:text-[11px]">
                  Sélection
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d2f29] sm:text-3xl">
                  Tudo em {cat.name.toLowerCase()}
                </h3>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#76655d] sm:text-[15px] sm:text-right">
                Explore os itens disponíveis nesta categoria e monte uma rotina mais bonita, consistente e alinhada ao estilo da loja.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {list.map((p, index) => (
                <div
                  key={p.id}
                  className={
                    index % 3 === 0
                      ? "fade-up"
                      : index % 3 === 1
                        ? "fade-up-delay-1"
                        : "fade-up-delay-2"
                  }
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="relative overflow-hidden rounded-[2rem] border border-dashed border-[#e8ddd6] bg-[linear-gradient(180deg,#fffdfb_0%,#faf5f1_100%)] px-6 py-12 text-center shadow-[0_20px_60px_-35px_rgba(61,47,41,0.2)] sm:px-10 sm:py-16">
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#ead2c6]/35 blur-3xl"
              aria-hidden
            />
            <div className="relative mx-auto max-w-xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5ebe6] text-[#8b7355] shadow-sm">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </div>

              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d2f29] sm:text-3xl">
                Em breve, novidades por aqui.
              </p>
              <p className="mt-3 text-sm leading-7 text-[#7a6a62] sm:text-base">
                Estamos preparando uma seleção especial para esta categoria, mantendo o mesmo cuidado visual e a mesma curadoria sensível do restante da loja.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full bg-[#3d2f29] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#5c4a42]"
                >
                  Voltar para o início
                </Link>
                <Link
                  href="/categoria/skin-care"
                  className="inline-flex items-center justify-center rounded-full border border-[#ccb7ab] bg-white px-6 py-3 text-sm font-medium text-[#3d2f29] transition hover:bg-[#faf6f2]"
                >
                  Explorar outra categoria
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {others.length > 0 && (
        <section className="fade-up-delay-2 border-t border-[#eadfd8] bg-[#fcf8f5] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a89890] sm:text-[11px]">
                  Continue explorando
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d2f29] sm:text-3xl">
                  Outras categorias
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#7a6a62] sm:text-[15px] sm:text-right">
                Navegue por outras seleções da loja e descubra novos rituais de beleza.
              </p>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((c, index) => (
                <li
                  key={c.slug}
                  className={
                    index % 3 === 0
                      ? "fade-up"
                      : index % 3 === 1
                        ? "fade-up-delay-1"
                        : "fade-up-delay-2"
                  }
                >
                  <Link
                    href={`/categoria/${c.slug}`}
                    className="group relative block overflow-hidden rounded-[1.75rem] border border-[#eadfd8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${accent(c.slug)} opacity-[0.14] transition group-hover:opacity-[0.2]`}
                      aria-hidden
                    />
                    <div className="relative">
                      <span className="inline-flex rounded-full bg-[#faf3ee] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9a7d70]">
                        0{index + 1}
                      </span>
                      <p className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-[#3d2f29]">
                        {c.name}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#74635c]">
                        {c.blurb}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#8b7355]">
                        Ver categoria
                        <span className="transition group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
