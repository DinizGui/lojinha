"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/conta";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const googleEnabled = typeof window !== "undefined" && document.cookie.includes("google-enabled=1");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Email ou senha incorretos");
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-7 space-y-4">
      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-[#a89890]">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-[#e0d5cd] bg-white px-4 py-3 text-sm text-[#3d2f29] outline-none transition placeholder:text-[#c4b3aa] focus:border-[#8b7355] focus:ring-2 focus:ring-[#c4a69a]/40"
          placeholder="voce@exemplo.com"
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="pw" className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a89890]">
            Senha
          </label>
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="text-xs font-medium text-[#8b7355] hover:underline"
          >
            {showPw ? "Esconder" : "Mostrar"}
          </button>
        </div>
        <input
          id="pw"
          type={showPw ? "text" : "password"}
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-[#e0d5cd] bg-white px-4 py-3 text-sm text-[#3d2f29] outline-none transition placeholder:text-[#c4b3aa] focus:border-[#8b7355] focus:ring-2 focus:ring-[#c4a69a]/40"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3d2f29] py-3.5 text-sm font-semibold text-white transition hover:bg-[#5c4a42] hover:shadow-md disabled:opacity-50"
      >
        {loading ? "Entrando…" : "Entrar"}
        {!loading && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {googleEnabled && (
        <>
          <div className="relative my-2 text-center">
            <span className="relative z-10 bg-[#faf6f2] px-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a89890]">
              ou
            </span>
            <span className="absolute inset-x-0 top-1/2 -z-0 border-t border-[#e8ddd6]" />
          </div>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e0d5cd] bg-white py-3 text-sm font-medium text-[#3d2f29] transition hover:border-[#8b7355] hover:shadow-sm"
          >
            Entrar com Google
          </button>
        </>
      )}
    </form>
  );
}
