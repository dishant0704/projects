export const runtime = "nodejs";

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { connect } from "@/mongoConfig/mongoDB";
import User from "./models/userModels";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,

  callbacks: {
    async signIn({ user, account }) {
      await connect();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          username: user.name,
          email: user.email,
          image: user.image,
          provider: account?.provider,
          providerId: account?.providerAccountId,
          isVerified: true,
        });
      }

      return true;
    },

    async jwt({ token }) {
      if (!token.email) return token;

      await connect();
      const dbUser = await User.findOne({ email: token.email });

      if (dbUser) token.userId = dbUser._id.toString();

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
});