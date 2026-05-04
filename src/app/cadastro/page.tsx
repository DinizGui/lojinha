import Image from "next/image";
import Link from "next/link";
import { SignupForm } from "./SignupForm";

export const dynamic = "force-dynamic";

export default function CadastroPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-md flex-col items-center justify-center px-4 py-12">
      <div className="w-full rounded-2xl border border-[#e8ddd6] bg-white p-7 shadow-sm sm:p-9">
        <Link href="/" className="mx-auto mb-5 block h-16 w-16 overflow-hidden rounded-full ring-1 ring-[#e0d5cd]">
          <Image src="/logo.png" alt="" width={64} height={64} className="h-full w-full object-cover" priority />
        </Link>
        <h1 className="text-center font-[family-name:var(--font-display)] text-2xl tracking-[0.18em] text-[#3d2f29]">
          MA BELLE
        </h1>
        <p className="mb-6 text-center text-[10px] font-medium uppercase tracking-[0.4em] text-[#a89890]">
          Paris
        </p>
        <h2 className="text-center text-base font-semibold text-[#3d2f29]">Criar conta</h2>
        <p className="mt-1 text-center text-sm text-[#7a6a62]">
          Pra acompanhar seus pedidos e salvar favoritos.
        </p>

        <SignupForm />

        <p className="mt-6 text-center text-sm text-[#7a6a62]">
          Já tem conta?{" "}
          <Link href="/login" className="font-medium text-[#5c4a42] underline hover:text-[#3d2f29]">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
