"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-lg border border-[#e0d5cd] bg-white px-4 py-2 text-sm font-medium text-[#5c4a42] transition hover:border-[#c4a69a]"
    >
      Sair
    </button>
  );
}
