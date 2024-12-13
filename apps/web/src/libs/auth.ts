import { JwtPayload } from "@repo/utils/types";
import { jwtDecode } from "jwt-decode";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetcher } from "./fetcher";
import { serverFetcher } from "./server-fetcher";

// Custom Error For Force Log out
class ForceLogoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForceLogoutError";
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "login",
      id: "login",
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
      async authorize(credentials, _req) {
        const { email, password } = credentials || {};
        if (!email || !password) return null;
        const result = await serverFetcher<{ accessToken: string; refreshToken: string }>("/auth/login", {
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
          id: decodedAccessToken._id,
          accessTokenExpiresAt: decodedAccessToken.exp * 1000, // convert to milliseconds
          refreshTokenExpiresAt: decodedRefreshToken.exp * 1000, // convert to milliseconds
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

      // check access token has been expired
      if (Date.now() > token.accessExpiresAt) {
        //check refresh token has been expired
        if (Date.now() > token.refreshExpiresAt) {
          throw new ForceLogoutError("Refresh Token  expired. Please login again.");
        }

        // if refresh token has not expired get new access token

        const refreshTokenResponse = await fetcher<{ accessToken: string; refreshToken: string }>(
          "/auth/refresh-token",
          {
            method: "POST",
            headers: {
              token: token.refreshToken,
            },
          }
        );

        if (!refreshTokenResponse.success || !refreshTokenResponse.data) {
          throw new ForceLogoutError("Failed to retrieve token.");
        }

        const { accessToken, refreshToken } = refreshTokenResponse.data;
        // decode tokens

        const decodedAccessToken = jwtDecode<JwtPayload>(accessToken);
        const decodedRefreshToken = jwtDecode<JwtPayload>(refreshToken);
        return {
          accessToken: accessToken,
          refreshToken: refreshToken,
          accessExpiresAt: decodedAccessToken.exp * 1000,
          refreshExpiresAt: decodedRefreshToken.exp * 1000,
        };
      }

      return token;
    },

    // session callback
    async session({ session, token }) {
      /* 
      @@ Need to do: get user data and set in the session 
      */
      if (token) {
        const decodedAccessToken = jwtDecode<JwtPayload>(token.accessToken);
        return {
          expires: new Date(token.accessExpiresAt).toISOString(),
          accessToken: token.accessToken,

          user: {
            userId: decodedAccessToken._id,
            email: decodedAccessToken.email,
          },
        };
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,

  events: {
    async signOut({}) {
      await fetcher("/auth/logout", {
        method: "POST",
      });
    },
  },
};
