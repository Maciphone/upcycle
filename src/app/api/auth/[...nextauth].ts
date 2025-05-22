import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcrypt";
import { MongoClient } from "mongodb";

const handler = NextAuth({
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
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", 
  },
});

export { handler as GET, handler as POST };
