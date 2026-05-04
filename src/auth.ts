import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { getPool } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

type CustomerRow = RowDataPacket & {
  id: string;
  email: string;
  password_hash: string | null;
  name: string;
  google_id: string | null;
  image_url: string | null;
};

async function findCustomerByEmail(email: string) {
  const [rows] = await getPool().query<CustomerRow[]>(
    "SELECT id, email, password_hash, name, google_id, image_url FROM customers WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0] ?? null;
}

async function findCustomerByGoogleId(googleId: string) {
  const [rows] = await getPool().query<CustomerRow[]>(
    "SELECT id, email, password_hash, name, google_id, image_url FROM customers WHERE google_id = ? LIMIT 1",
    [googleId]
  );
  return rows[0] ?? null;
}

async function createGoogleCustomer(opts: {
  email: string;
  name: string;
  googleId: string;
  image: string | null;
}) {
  const id = nanoid(24);
  await getPool().query<ResultSetHeader>(
    "INSERT INTO customers (id, email, name, google_id, image_url) VALUES (?, ?, ?, ?, ?)",
    [id, opts.email, opts.name, opts.googleId, opts.image]
  );
  return id;
}

async function linkGoogleToCustomer(customerId: string, googleId: string, image: string | null) {
  await getPool().query<ResultSetHeader>(
    "UPDATE customers SET google_id = ?, image_url = COALESCE(image_url, ?) WHERE id = ?",
    [googleId, image, customerId]
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Email e senha",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(creds) {
        const email = String(creds?.email ?? "").trim().toLowerCase();
        const password = String(creds?.password ?? "");
        if (!email || !password) return null;
        const customer = await findCustomerByEmail(email);
        if (!customer || !customer.password_hash) return null;
        const ok = await bcrypt.compare(password, customer.password_hash);
        if (!ok) return null;
        return {
          id: customer.id,
          email: customer.email,
          name: customer.name,
          image: customer.image_url ?? undefined,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") return true;
      const email = (profile?.email ?? user?.email ?? "").toLowerCase();
      const googleId = account.providerAccountId;
      const name = profile?.name ?? user?.name ?? email.split("@")[0];
      const image = (profile as { picture?: string } | undefined)?.picture ?? user?.image ?? null;
      if (!email || !googleId) return false;

      const byGoogle = await findCustomerByGoogleId(googleId);
      if (byGoogle) {
        user.id = byGoogle.id;
        return true;
      }
      const byEmail = await findCustomerByEmail(email);
      if (byEmail) {
        await linkGoogleToCustomer(byEmail.id, googleId, image);
        user.id = byEmail.id;
        return true;
      }
      const id = await createGoogleCustomer({ email, name, googleId, image });
      user.id = id;
      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) token.customerId = user.id as string;
      return token;
    },
    async session({ session, token }) {
      if (token.customerId && session.user) {
        (session.user as { id?: string }).id = token.customerId as string;
      }
      return session;
    },
  },
});
