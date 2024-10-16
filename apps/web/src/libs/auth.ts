import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import { fetcher } from "./fetcher";
import { TRefreshToken, TSession, TUser } from "@repo/utils/types";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const result = await fetcher<{ accessToken: TSession; refreshToken: TRefreshToken }>("/auth/login", {
          method: "POST",
          body: { email: credentials.email, password: credentials.password },
          cache: "no-store",
        });
        console.log({ result }, `auth - 24`);
        if (!result.success) {
          throw new Error(JSON.stringify({ message: result.message, status: result.statusCode }));
        }

        if (!result.success || !result.data) {
          return null;
        }

        return result;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 604800,
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log({ token, user }, "42");

      // First Time login
      if (user) {
        const extendedUser = user;
        return {
          ...token,
          sessionToken: extendedUser.sessionToken,
          refreshToken: extendedUser.refreshToken,
          sessionExpiresAt: extendedUser.sessionExpiresAt,
          refreshExpiresAt: extendedUser.refreshExpiresAt,
          userId: parseInt(extendedUser.id, 10),
        };
      }

      const jwtToken = token;
      // Check if the session token has expired
      if (new Date().getTime() > jwtToken.sessionExpiresAt) {
        // Check if the refresh token has expired
        if (Date.now() > jwtToken.refreshExpiresAt) {
          // Both tokens have expired, force sign out
          signOut({ callbackUrl: "/login" });
          return { ...jwtToken, error: "RefreshTokenExpired" as const };
        }
        const response = await fetcher<{ session: TSession; refreshToken: TRefreshToken }>("/auth/refresh-session", {
          method: "POST",
          headers: {
            Cookie: `refresh_token=${jwtToken.refreshToken}`,
          },
        });
        if (!response.success) {
          signOut({ callbackUrl: "/login" });
          return { ...jwtToken, error: "RefreshTokenError" as const };
        }

        if (response.success && response.data) {
          return {
            ...jwtToken,
            sessionToken: response.data.session.sessionToken,
            refreshToken: response.data.refreshToken.token,
            sessionExpiresAt: new Date(response.data.session.expiresAt).getTime(),
            refreshExpiresAt: new Date(response.data.refreshToken.expiresAt).getTime(),
          };
        }
      }

      return jwtToken;
    },
    async session({ session, token }) {
      const jwtToken = token;

      // Fetch the latest user data
      const result = await fetcher<{ user: TUser }>("/auth/get-me", {
        headers: {
          Cookie: `session_token=${jwtToken.sessionToken}`,
        },
        next: {
          revalidate: 300,
          tags: ["auth"],
        },
      });
      if (!result.success || !result.data) {
        throw new Error("Failed to fetch user data");
      }
      return {
        ...session,
        user: {
          ...result.data.user,
        },
        sessionToken: jwtToken.sessionToken,
        expires: new Date(jwtToken.sessionExpiresAt).toISOString(),
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
