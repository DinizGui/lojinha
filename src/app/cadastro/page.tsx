import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function CadastroPage() {
  redirect("/login?mode=signup");
}
