"use server";

import { serverFetcher } from "@/libs/server-fetcher";
import { TChangePasswordPayload, TUser } from "@repo/utils/types";

export const register = async (data: TUser) => {
  const response = await serverFetcher("/auth/register", {
    method: "POST",
    body: data,
    cache: "no-store",
  });

  return response;
};

export const resendVerificationMail = async (email: string) => {
  const response = await serverFetcher("/auth/resent-verification-link", {
    method: "POST",
    body: { email },
    cache: "no-store",
  });
  return response;
};

export const verifyAccount = async (token: string) => {
  const response = await serverFetcher("/auth/verify-account", {
    method: "POST",
    body: {
      token,
    },
    cache: "no-store",
  });

  return response;
};

export const changePassword = async (payload: Pick<TChangePasswordPayload, "oldPassword" | "password">) => {
  const response = await serverFetcher<TUser>("/auth/change-password", {
    cache: "no-store",
    body: payload,
    method: "POST",
  });

  return response;
};
