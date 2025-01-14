import { TUser } from "@repo/utils/types";
import { DefaultUser } from "next-auth";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: {
      email: string;
      userId: string;
    };
    // user: TUser;
    accessToken: string;
  }

  interface User extends Omit<DefaultUser, "id"> {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    refreshTokenExpiresAt: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    accessExpiresAt: number;
    refreshToken: string;
    refreshExpiresAt: number;
  }
}
