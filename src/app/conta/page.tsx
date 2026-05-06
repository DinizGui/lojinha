import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function ContaPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/conta");
  }

  const name = session.user.name ?? "";
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  const firstName = name.split(/\s+/)[0] || "querida";

  return (
    <div>
      {/* Header strip */}
      <section className="border-b border-[#e8ddd6] bg-gradient-to-br from-[#f5ebe6] via-[#f5ebe6] to-[#ebdcd1]">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#c4a69a] to-[#5c4a42] text-2xl font-semibold text-white shadow-lg ring-4 ring-white/60">
                {initial}
              </div>
              <div>
                <span className="ornament text-[#3d2f29]/60">Mon compte</span>
                <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[#3d2f29] sm:text-4xl">
                  Olá, {firstName}.
                </h1>
                <p className="mt-1 text-sm text-[#5c4a42]">
                  Bem-vinda de volta. Que bom te ver por aqui.
                </p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Personal data */}
          <div className="rounded-2xl border border-[#e8ddd6] bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#3d2f29]">Dados pessoais</h2>
              <span className="rounded-full bg-[#f5ebe6] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b7355]">
                Verificada
              </span>
            </div>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-[#faf6f2] p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a89890]">
                  Nome
                </dt>
                <dd className="mt-1 text-base font-medium text-[#3d2f29]">
                  {session.user.name}
                </dd>
              </div>
              <div className="rounded-xl bg-[#faf6f2] p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a89890]">
                  Email
                </dt>
                <dd className="mt-1 break-all text-base font-medium text-[#3d2f29]">
                  {session.user.email}
                </dd>
              </div>
            </dl>
          </div>

          {/* Quick actions */}
          <div className="space-y-4">
            <Link
              href="/"
              className="group block rounded-2xl border border-[#e8ddd6] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#3d2f29]">Continuar comprando</p>
                <span className="text-[#c4a69a] transition group-hover:translate-x-0.5">→</span>
              </div>
              <p className="mt-1 text-xs text-[#7a6a62]">Volte para a vitrine.</p>
            </Link>
            <Link
              href="/categoria/skin-care"
              className="group block rounded-2xl border border-[#e8ddd6] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#3d2f29]">Skin care</p>
                <span className="text-[#c4a69a] transition group-hover:translate-x-0.5">→</span>
              </div>
              <p className="mt-1 text-xs text-[#7a6a62]">Cuidado pra sua pele.</p>
            </Link>
          </div>
        </div>

        {/* Orders placeholder */}
        <div className="mt-8 rounded-2xl border border-dashed border-[#e0d5cd] bg-white/60 p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5ebe6] text-[#8b7355]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <p className="font-[family-name:var(--font-display)] text-xl text-[#3d2f29]">
            Seus pedidos aparecerão aqui
          </p>
          <p className="mt-1 text-sm text-[#7a6a62]">
            Acompanhe entregas e veja o histórico das suas compras.
          </p>
        </div>
      </div>
    </div>
  );
}
