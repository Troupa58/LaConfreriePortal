import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "identify"
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile?.id) {
        token.discordId = String(profile.id);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.discordId) {
        session.user.discordId = String(token.discordId);
      }
      return session;
    },
    async signIn({ user, profile }) {
      if (!profile?.id || !user.name) return false;

      await prisma.member.upsert({
        where: { discordId: String(profile.id) },
        update: {
          name: user.name,
          image: user.image
        },
        create: {
          discordId: String(profile.id),
          name: user.name,
          image: user.image
        }
      });

      return true;
    }
  },
  pages: {
    signIn: "/"
  }
});
