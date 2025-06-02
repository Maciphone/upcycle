import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongooAuth";
import { compare } from "bcrypt";
import { MongoClient } from "mongodb";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise as Promise<MongoClient>),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const users = client.db().collection("users");
        const user = await users.findOne({ email: credentials?.email });
        if (!user) throw new Error("Nincs ilyen felhasználó");
        const valid = await compare(credentials!.password, user.password);
        if (!valid) throw new Error("Hibás jelszó");
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || user.email,
          role: user.role || "customer",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60, // 1 óra
    updateAge: 60 * 30, // 30 percenként frissítjük a session-t
  },
  jwt: {
    maxAge: 60 * 60, // 1 nap
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      // Login-kor a user.id-t beletesszük a tokenbe
      if (user) {
        token.id = user.id;
        token.role = user.role || "customer"; // Alapértelmezett szerep
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      // A token.id-t átmásoljuk a session.user-be
      if (session.user && token.id) {
        session.user.id = token.id;
        session.user.role = token.role || "customer"; // Alapértelmezett szerep
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
