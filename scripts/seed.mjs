/**
 * Popula categorias e produtos iniciais (mesmo dataset da vitrine estática).
 * Uso: DATABASE_URL="mysql://..." node scripts/seed.mjs
 */
import mysql from "mysql2/promise";

const categories = [
  ["cabelos", "Cabelos", "Shampoos, condicionadores, máscaras e finalizadores"],
  ["perfumaria", "Perfumaria", "Perfumes, colônias e body splash"],
  ["skin-care", "Skin care", "Hidratantes, sérum e protetor solar"],
  ["higiene-pessoal", "Higiene pessoal", "Sabonetes, desodorantes e pasta de dente"],
  ["maquiagem", "Maquiagem", "Lábios, olhos e rosto"],
  ["naturais-veganos", "Naturais e veganos", "Seleção com ingredientes conscientes"],
];

const products = [
  ["shampoo-reparacao-diaria", "cabelos", "Shampoo Reparação Diária", "Limpa sem ressecar e fortalece o fio", "Fórmula suave para uso frequente. Ajuda a reduzir o frizz e prepara o cabelo para hidratação.", 42.9, "from-rose-100 to-amber-50"],
  ["condicionador-desmaia-cabelo", "cabelos", "Condicionador Desmaia Fios", "Desembaraço instantâneo e brilho", "Textura cremosa que selagem leve. Ideal para cabelos médios a grossos com pontas espigadas.", 44.9, "from-stone-100 to-rose-50"],
  ["mascara-nutricao-profunda", "cabelos", "Máscara Nutrição Profunda", "Tratamento semanal intensivo", "Manteiga de karité e óleos vegetais. Deixe agir 10–15 minutos para fios mais macios.", 79.9, "from-amber-100 to-orange-50"],
  ["finalizador-protecao-termica", "cabelos", "Finalizador Proteção Térmica", "Protege do calor até 230 °C", "Spray leve, não oleoso. Reduz danos de secador e chapinha com acabamento natural.", 56.0, "from-orange-50 to-rose-100"],
  ["perfume-floral-ambarado", "perfumaria", "Eau de Parfum Aura Floral", "Fixação confortável para o dia a dia", "Notas de jasmim, madeiras claras e âmbar suave. Frasco 50 ml.", 189.0, "from-fuchsia-50 to-purple-100"],
  ["colonia-citrus-fresco", "perfumaria", "Colônia Citrus Fresco", "Sensação limpa e energizante", "Toques de bergamota e lima. Perfeita após o banho ou em dias quentes.", 89.9, "from-lime-50 to-emerald-50"],
  ["body-splash-pera-vanilla", "perfumaria", "Body Splash Pera & Vanilla", "Perfuma suave sem pesar", "Textura leve para corpo e decote. Combine com hidratante da mesma linha.", 49.9, "from-yellow-50 to-amber-100"],
  ["hidratante-facial-acido-hialuronico", "skin-care", "Hidratante Facial Ácido Hialurônico", "Hidratação em gel, toque seco", "Para peles normais a mistas. Absorção rápida, base para maquiagem ou protetor solar.", 72.0, "from-sky-50 to-cyan-50"],
  ["serum-vitamina-c", "skin-care", "Sérum Vitamina C 15%", "Uniformiza o tom e ilumina", "Uso noturno ou diurno com FPS. Textura aquosa, teste de toque antes de expandir o uso.", 98.0, "from-orange-50 to-amber-100"],
  ["protetor-solar-fps50", "skin-care", "Protetor Solar FPS 50 Toque Seco", "Alta proteção sem branco residual", "Filtros modernos e acabamento mate. Reaplique a cada 2 horas em exposição solar direta.", 84.5, "from-blue-50 to-indigo-50"],
  ["sabonete-liquido-avela", "higiene-pessoal", "Sabonete Líquido Avelã", "Espuma cremosa e perfume delicado", "pH amigável para rotina diária. Frasco com válvula pump 400 ml.", 34.9, "from-stone-100 to-neutral-100"],
  ["desodorante-roll-on-sem-aluminio", "higiene-pessoal", "Desodorante Roll-on Sem Alumínio", "Proteção natural com fragrância suave", "Cuide da sensibilidade da pele das axilas. Toque refrescante.", 28.9, "from-green-50 to-emerald-50"],
  ["pasta-dente-branco-suave", "higiene-pessoal", "Pasta de Dente Branco Suave", "Limpeza eficaz e menos sensibilidade", "Flúor em concentração adequada para adultos. Uso com escova macia.", 16.5, "from-slate-50 to-zinc-100"],
  ["batom-cetim-nude-rose", "maquiagem", "Batom Cetim Nude Rose", "Cor versátil com conforto nos lábios", "Acabamento cetim, não resseca. Estojo slim para levar na bolsa.", 45.0, "from-rose-200 to-pink-100"],
  ["mascara-cilios-volume", "maquiagem", "Máscara de Cílios Volume", "Volume definido sem borrar no dia a dia", "Escova que separa os fios. Remova com demaquilante bifásico.", 62.0, "from-zinc-200 to-neutral-300"],
  ["blush-cremoso-pessego", "maquiagem", "Blush Cremoso Pêssego", "Aparência natural e fundível na pele", "Textura em bastão. Esfumasse com dedo ou esponja.", 54.9, "from-orange-200 to-rose-100"],
  ["shampoo-barra-argila-verde", "naturais-veganos", "Shampoo em Barra Argila Verde", "Limpeza equilibrada, menos plástico", "Ingredientes de origem vegetal. Enxágue bem e complemente com condicionador.", 38.0, "from-emerald-100 to-lime-50"],
  ["oleo-multifuncional-jojoba", "naturais-veganos", "Óleo de Jojoba Multifuncional", "Rosto, corpo e pontas com um só produto", "Poucas gotas já rendem. Vegano, sem fragrância sintética agressiva.", 69.0, "from-yellow-100 to-amber-50"],
  ["creme-corporal-babacu", "naturais-veganos", "Creme Corporal Babacu", "Nutre a pele com textura aveludada", "Fórmula sem parabenos da lista comum. Hidratação prolongada após o banho.", 59.9, "from-green-50 to-teal-50"],
];

async function main() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    console.error("Defina DATABASE_URL");
    process.exit(1);
  }
  const conn = await mysql.createConnection(url);
  try {
    for (const [slug, name, blurb] of categories) {
      await conn.execute(
        `INSERT INTO categories (slug, name, blurb) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE name = VALUES(name), blurb = VALUES(blurb)`,
        [slug, name, blurb]
      );
    }
    for (const [id, category_slug, name, benefit, description, price, accent] of products) {
      await conn.execute(
        `INSERT INTO products (id, category_slug, name, benefit, description, price, accent, image_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, NULL)
         ON DUPLICATE KEY UPDATE
           category_slug = VALUES(category_slug),
           name = VALUES(name),
           benefit = VALUES(benefit),
           description = VALUES(description),
           price = VALUES(price),
           accent = VALUES(accent)`,
        [id, category_slug, name, benefit, description, price, accent]
      );
    }
    console.log("Seed OK:", categories.length, "categorias,", products.length, "produtos");
  } finally {
    await conn.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
