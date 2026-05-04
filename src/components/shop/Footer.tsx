import { getStoreName } from "@/lib/config";

export function Footer() {
  const name = getStoreName();
  return (
    <footer className="mt-auto border-t border-[#e8ddd6] bg-[#f5ebe6]">
      <div className="mx-auto max-w-6xl px-4 py-10 text-center text-sm text-[#7a6a62]">
        {name ? (
          <p className="font-[family-name:var(--font-display)] text-lg text-[#5c4a42]">{name}</p>
        ) : null}
        <p className={name ? "mt-2" : ""}>Beleza e bem-estar — loja virtual.</p>
        <p className="mt-4 text-xs">
          © {new Date().getFullYear()}
          {name ? ` ${name}` : ""}
        </p>
      </div>
    </footer>
  );
}
