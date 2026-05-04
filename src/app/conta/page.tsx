import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function ContaPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/conta");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[#3d2f29]">Minha conta</h1>
      <p className="mt-1 text-sm text-[#7a6a62]">Bem-vinda, {session.user.name}.</p>

      <div className="mt-8 rounded-2xl border border-[#e8ddd6] bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-[#3d2f29]">Dados</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-[#7a6a62]">Nome</dt>
            <dd className="font-medium text-[#3d2f29]">{session.user.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#7a6a62]">Email</dt>
            <dd className="font-medium text-[#3d2f29]">{session.user.email}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 flex justify-end">
        <LogoutButton />
      </div>
    </div>
  );
}
