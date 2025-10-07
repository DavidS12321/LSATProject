import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "placeholder",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "placeholder"
    })
  ],
  session: {
    strategy: "database"
  },
  debug: process.env.NODE_ENV === "development"
};
