import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

import { prisma } from "./prisma";
import { verifyPassword } from "./password";
import { signInSchema } from "./validators";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse({
          email: credentials?.email,
          password: credentials?.password
        });

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user?.hashedPassword) {
          return null;
        }

        try {
          const isValid = await verifyPassword(password, user.hashedPassword);
          if (!isValid) {
            return null;
          }
        } catch (error) {
          console.error("Failed to verify password", error);
          throw new Error("Password verification failed. Please try again.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email
        };
        return user;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "placeholder",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "placeholder"
    })
  ],
  session: {
    strategy: "database"
  },
  pages: {
    signIn: "/"
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
      }

      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
};
