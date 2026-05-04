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
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-800">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#5c4a42]">
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
          className="w-full rounded-lg border border-[#e0d5cd] bg-[#faf7f5] px-3.5 py-2.5 text-sm text-[#3d2f29] outline-none transition focus:border-[#c4a69a] focus:bg-white"
          placeholder="voce@exemplo.com"
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="pw" className="text-sm font-medium text-[#5c4a42]">Senha</label>
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="text-xs text-[#8b7355] hover:underline"
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
          className="w-full rounded-lg border border-[#e0d5cd] bg-[#faf7f5] px-3.5 py-2.5 text-sm text-[#3d2f29] outline-none transition focus:border-[#c4a69a] focus:bg-white"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#3d2f29] py-2.5 text-sm font-medium text-white transition hover:bg-[#2c2420] disabled:opacity-50"
      >
        {loading ? "Entrando…" : "Entrar"}
      </button>

      {googleEnabled && (
        <>
          <div className="relative my-1 text-center">
            <span className="relative z-10 bg-white px-3 text-xs uppercase tracking-wider text-[#a89890]">ou</span>
            <span className="absolute inset-x-0 top-1/2 -z-0 border-t border-[#e8ddd6]" />
          </div>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#e0d5cd] bg-white py-2.5 text-sm font-medium text-[#3d2f29] transition hover:border-[#c4a69a]"
          >
            Entrar com Google
          </button>
        </>
      )}
    </form>
  );
}
