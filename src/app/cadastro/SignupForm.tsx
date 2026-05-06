"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || undefined,
          password,
        }),
      });
      const j = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(j.error ?? "Erro ao cadastrar");
        return;
      }
      const login = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });
      if (login?.error) {
        setError("Conta criada, mas falha ao entrar. Use a tela de login.");
        return;
      }
      router.push("/conta");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-[#e0d5cd] bg-white px-4 py-3 text-sm text-[#3d2f29] outline-none transition placeholder:text-[#c4b3aa] focus:border-[#8b7355] focus:ring-2 focus:ring-[#c4a69a]/40";
  const labelCls =
    "mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-[#a89890]";

  return (
    <form onSubmit={onSubmit} className="mt-7 space-y-4">
      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="name" className={labelCls}>Nome</label>
        <input
          id="name" type="text" autoComplete="name" required value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Como devemos te chamar?"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>Email</label>
        <input
          id="email" type="email" autoComplete="email" required value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@exemplo.com"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="phone" className={labelCls}>
          WhatsApp <span className="font-medium normal-case tracking-normal text-[#c4b3aa]">(opcional)</span>
        </label>
        <input
          id="phone" type="tel" autoComplete="tel" value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(11) 99999-9999"
          className={inputCls}
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="pw" className={labelCls + " mb-0"}>Senha</label>
          <button type="button" onClick={() => setShowPw((v) => !v)} className="text-xs font-medium text-[#8b7355] hover:underline">
            {showPw ? "Esconder" : "Mostrar"}
          </button>
        </div>
        <input
          id="pw" type={showPw ? "text" : "password"} autoComplete="new-password" required minLength={6}
          value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Pelo menos 6 caracteres"
          className={inputCls}
        />
      </div>

      <button
        type="submit" disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3d2f29] py-3.5 text-sm font-semibold text-white transition hover:bg-[#5c4a42] hover:shadow-md disabled:opacity-50"
      >
        {loading ? "Criando…" : "Criar minha conta"}
        {!loading && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </form>
  );
}
