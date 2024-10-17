import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import { fetcher } from "./fetcher";
import { TRefreshToken, TSession, TUser } from "@repo/utils/types";

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
      async authorize(credentials, req) {
        const { email, password } = credentials || {};
        if (!email || !password) return null;
        const result = await fetcher<{ accessToken: string; refreshToken: string }>("/auth/login", {
          method: "POST",
          body: { email, password },
          cache: "no-store",
        });
        if (result.statusCode === 401) return null;
        return {
          accessToken: result?.data?.accessToken,
          refreshToken: result?.data?.refreshToken,
        };
      },
    }),
  ],
};
