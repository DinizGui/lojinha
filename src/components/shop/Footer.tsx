import { getStoreName } from "@/lib/config";
import Image from "next/image";

export function Footer() {
  const name = getStoreName();
  return (
    <footer className="mt-auto border-t border-[#e8ddd6] bg-[#f5ebe6]">
      <div className="mx-auto max-w-6xl px-4 py-12 text-center text-sm text-[#7a6a62]">
        <div className="mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full ring-1 ring-[#d4c4bb]">
          <Image
            src="/logo.png"
            alt={name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="font-[family-name:var(--font-display)] text-lg tracking-[0.2em] text-[#3d2f29]">
          MA BELLE
        </p>
        <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#a89890]">
          Paris
        </p>
        <p className="mt-4 max-w-md mx-auto text-sm text-[#7a6a62]">
          Beleza, elegância e bem-estar — com o charme de Paris.
        </p>
        <p className="mt-6 text-xs">
          © {new Date().getFullYear()} {name}
        </p>
      </div>
    </footer>
  );
}
