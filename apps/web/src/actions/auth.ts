"use server";

import { serverFetcher } from "@/libs/server-fetcher";
import { TUser } from "@repo/utils/types";

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
