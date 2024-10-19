import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetcher } from "./fetcher";
import { JwtPayload } from "@repo/utils/types";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      // authorize
      async authorize(credentials, req) {
        const { email, password } = credentials || {};
        if (!email || !password) return null;
        const result = await fetcher<{ accessToken: string; refreshToken: string }>("/auth/login", {
          method: "POST",
          body: { email, password },
          cache: "no-store",
        });
        if (result.statusCode === 401) return null;
        const accessToken = result?.data?.accessToken!;
        const refreshToken = result?.data?.refreshToken!;
        if (!accessToken && !refreshToken) return null;

        // decode tokens
        const decodedAccessToken = jwtDecode<JwtPayload>(accessToken);
        const decodedRefreshToken = jwtDecode<JwtPayload>(refreshToken);

        const user: User = {
          accessToken: accessToken,
          refreshToken: refreshToken,
          id: decodedAccessToken.userId,
          accessTokenExpiresAt: decodedAccessToken.exp,
          refreshTokenExpiresAt: decodedRefreshToken.exp,
        };

        return user;
      },
    }),
  ],

  // configure session
  session: {
    strategy: "jwt",
    maxAge: 604800,
  },

  callbacks: {
    // jwt callback
    async jwt({ token, user }) {
      if (user) {
        return {
          accessToken: user.accessToken,
          accessExpiresAt: user.accessTokenExpiresAt,
          refreshToken: user.refreshToken,
          refreshExpiresAt: user.refreshTokenExpiresAt,
        };
      }

      return token;
    },

    // session callback
    async session({ session, token }) {
      console.log(token.accessExpiresAt, "number time");

      console.log(new Date(token.accessExpiresAt * 1000).toISOString(), "expires at");

      return {
        expires: new Date(token.accessExpiresAt * 1000).toISOString(),
        accessToken: token.accessToken,

        user: {
          password: "",
          role: "ADMIN",
          status: "ACTIVE",
          phone_number: "",
          email: "email",
        },
      };
    },
  },

  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
