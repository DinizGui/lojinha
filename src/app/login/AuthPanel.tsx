"use client";

import { signIn } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type AuthMode = "login" | "signup";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}


function getGoogleEnabled() {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("google-enabled=1");
}

export function AuthPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/conta";
  const mode: AuthMode = params.get("mode") === "signup" ? "signup" : "login";
  const googleEnabled = getGoogleEnabled();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginShowPw, setLoginShowPw] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupShowPw, setSignupShowPw] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupLoading, setSignupLoading] = useState(false);

  const title = mode === "login" ? "Entrar na sua conta" : "Crie sua conta";
  const subtitle =
    mode === "login"
      ? "Acompanhe pedidos, favoritos e as suas escolhas de beleza."
      : "Cadastre-se para salvar favoritos, acompanhar pedidos e comprar com mais rapidez.";

  const switchCopy = useMemo(
    () =>
      mode === "login"
        ? {
            eyebrow: "Bienvenue",
            helper: "Ainda não tem conta?",
            cta: "Criar conta",
          }
        : {
            eyebrow: "Rejoignez-nous",
            helper: "Já tem conta?",
            cta: "Entrar",
          },
    [mode],
  );

  function setModeInUrl(nextMode: AuthMode) {
    const next = new URLSearchParams(params.toString());
    next.set("mode", nextMode);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }

  function handleModeChange(nextMode: AuthMode) {
    setModeInUrl(nextMode);
  }

  async function onLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      const res = await signIn("credentials", {
        email: loginEmail.trim().toLowerCase(),
        password: loginPassword,
        redirect: false,
      });
      if (res?.error) {
        setLoginError("Email ou senha incorretos.");
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } finally {
      setLoginLoading(false);
    }
  }

  async function onSignupSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSignupError(null);
    setSignupLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: signupEmail.trim().toLowerCase(),
          phone: phone.trim() || undefined,
          password: signupPassword,
        }),
      });
      const body = (await res.json()) as { error?: string };
      if (!res.ok) {
        setSignupError(body.error ?? "Erro ao criar conta.");
        return;
      }

      const login = await signIn("credentials", {
        email: signupEmail.trim().toLowerCase(),
        password: signupPassword,
        redirect: false,
      });
      if (login?.error) {
        setSignupError("Conta criada, mas não foi possível entrar automaticamente.");
        handleModeChange("login");
        return;
      }

      router.push("/conta");
      router.refresh();
    } finally {
      setSignupLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-[#e3d8d1] bg-white/80 px-4 py-3.5 text-sm text-[#3d2f29] outline-none transition placeholder:text-[#c4b3aa] focus:border-[#8b7355] focus:ring-2 focus:ring-[#c4a69a]/35";
  const labelClass =
    "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9e8f87]";

  return (
    <div className="fade-up-delay-1 relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_-30px_rgba(61,47,41,0.28)] backdrop-blur-xl sm:p-7">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_38%)]"
        aria-hidden
      />

      <div className="relative">
        <div className="flex rounded-full border border-[#eadfd8] bg-[#fcf8f5] p-1">
          <button
            type="button"
            onClick={() => handleModeChange("login")}
            className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition ${
              mode === "login" ? "bg-[#3d2f29] text-white shadow-sm" : "text-[#6f5d56] hover:text-[#3d2f29]"
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("signup")}
            className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition ${
              mode === "signup" ? "bg-[#3d2f29] text-white shadow-sm" : "text-[#6f5d56] hover:text-[#3d2f29]"
            }`}
          >
            Criar conta
          </button>
        </div>

        <div className="mt-7">
          <span className="ornament">{switchCopy.eyebrow}</span>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d2f29] sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-7 text-[#7a6a62]">{subtitle}</p>
        </div>

        {mode === "login" ? (
          <form onSubmit={onLoginSubmit} className="mt-7 space-y-4">
            {loginError && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {loginError}
              </p>
            )}

            <div>
              <label htmlFor="login-email" className={labelClass}>
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                autoFocus
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className={inputClass}
                placeholder="voce@exemplo.com"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="login-password" className={labelClass}>
                  Senha
                </label>
                <button
                  type="button"
                  onClick={() => setLoginShowPw((value) => !value)}
                  className="text-xs font-medium text-[#8b7355] hover:underline"
                >
                  {loginShowPw ? "Esconder" : "Mostrar"}
                </button>
              </div>
              <input
                id="login-password"
                type={loginShowPw ? "text" : "password"}
                autoComplete="current-password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3d2f29] py-3.5 text-sm font-semibold text-white transition hover:bg-[#5c4a42] hover:shadow-md disabled:opacity-50"
            >
              {loginLoading ? "Entrando..." : "Entrar"}
              {!loginLoading && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            {googleEnabled && (
              <>
                <div className="relative my-1 text-center">
                  <span className="relative z-10 bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a89890]">
                    ou
                  </span>
                  <span className="absolute inset-x-0 top-1/2 -z-0 border-t border-[#e8ddd6]" />
                </div>
                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl })}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#e0d5cd] bg-white py-3 text-sm font-medium text-[#3d2f29] transition hover:border-[#8b7355] hover:shadow-sm"
                >
                  Entrar com Google
                </button>
              </>
            )}
          </form>
        ) : (
          <form onSubmit={onSignupSubmit} className="mt-7 space-y-4">
            {signupError && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {signupError}
              </p>
            )}

            <div>
              <label htmlFor="signup-name" className={labelClass}>
                Nome
              </label>
              <input
                id="signup-name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Como devemos te chamar?"
              />
            </div>

            <div>
              <label htmlFor="signup-email" className={labelClass}>
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                required
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className={inputClass}
                placeholder="voce@exemplo.com"
              />
            </div>

            <div>
              <label htmlFor="signup-phone" className={labelClass}>
                WhatsApp <span className="normal-case tracking-normal text-[#c4b3aa]">(opcional)</span>
              </label>
              <input
                id="signup-phone"
                type="tel"
                autoComplete="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                className={inputClass}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="signup-password" className={labelClass}>
                  Senha
                </label>
                <button
                  type="button"
                  onClick={() => setSignupShowPw((value) => !value)}
                  className="text-xs font-medium text-[#8b7355] hover:underline"
                >
                  {signupShowPw ? "Esconder" : "Mostrar"}
                </button>
              </div>
              <input
                id="signup-password"
                type={signupShowPw ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={6}
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className={inputClass}
                placeholder="Pelo menos 6 caracteres"
              />
            </div>

            <button
              type="submit"
              disabled={signupLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3d2f29] py-3.5 text-sm font-semibold text-white transition hover:bg-[#5c4a42] hover:shadow-md disabled:opacity-50"
            >
              {signupLoading ? "Criando conta..." : "Criar minha conta"}
              {!signupLoading && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-[#7a6a62]">
          {switchCopy.helper}{" "}
          <button
            type="button"
            onClick={() => handleModeChange(mode === "login" ? "signup" : "login")}
            className="font-medium text-[#3d2f29] underline decoration-[#c4a69a] underline-offset-4 hover:text-[#5c4a42]"
          >
            {switchCopy.cta}
          </button>
        </p>
      </div>
    </div>
  );
}
