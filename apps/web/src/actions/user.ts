"use server";

import { serverFetcher } from "@/libs/server-fetcher";
import { TUser } from "@repo/utils/types";

export const getMyData = async () => {
  const response = await serverFetcher<TUser>("/users/me", {
    cache: "no-store",
  });
  const user = response.data || {};
  return user;
};

export const updateProfile = async (payload: Pick<TUser, "firstName" | "lastName" | "phoneNumber" | "dateOfBirth">) => {
  const response = await serverFetcher<TUser>("/users/update-me", {
    cache: "no-store",
    method: "PATCH",
    body: payload,
  });

  return response;
};
