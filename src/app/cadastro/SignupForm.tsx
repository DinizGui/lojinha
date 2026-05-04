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

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-800">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#5c4a42]">Nome</label>
        <input
          id="name" type="text" autoComplete="name" required value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-[#e0d5cd] bg-[#faf7f5] px-3.5 py-2.5 text-sm outline-none transition focus:border-[#c4a69a] focus:bg-white"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#5c4a42]">Email</label>
        <input
          id="email" type="email" autoComplete="email" required value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-[#e0d5cd] bg-[#faf7f5] px-3.5 py-2.5 text-sm outline-none transition focus:border-[#c4a69a] focus:bg-white"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[#5c4a42]">
          WhatsApp <span className="font-normal text-[#a89890]">(opcional)</span>
        </label>
        <input
          id="phone" type="tel" autoComplete="tel" value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(11) 99999-9999"
          className="w-full rounded-lg border border-[#e0d5cd] bg-[#faf7f5] px-3.5 py-2.5 text-sm outline-none transition focus:border-[#c4a69a] focus:bg-white"
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="pw" className="text-sm font-medium text-[#5c4a42]">Senha</label>
          <button type="button" onClick={() => setShowPw((v) => !v)} className="text-xs text-[#8b7355] hover:underline">
            {showPw ? "Esconder" : "Mostrar"}
          </button>
        </div>
        <input
          id="pw" type={showPw ? "text" : "password"} autoComplete="new-password" required minLength={6}
          value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Pelo menos 6 caracteres"
          className="w-full rounded-lg border border-[#e0d5cd] bg-[#faf7f5] px-3.5 py-2.5 text-sm outline-none transition focus:border-[#c4a69a] focus:bg-white"
        />
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full rounded-lg bg-[#3d2f29] py-2.5 text-sm font-medium text-white transition hover:bg-[#2c2420] disabled:opacity-50"
      >
        {loading ? "Criando…" : "Criar conta"}
      </button>
    </form>
  );
}
