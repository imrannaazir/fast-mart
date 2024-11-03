"use server";

import { serverFetcher } from "@/libs/server-fetcher";
import { TAddress, TAddressInput } from "@repo/utils/types";

export const addAddress = async (payload: TAddressInput) => {
  const response = await serverFetcher<TAddress>("/addresses", {
    method: "POST",
    body: payload,
  });

  return response;
};
