"use server";

import { serverFetcher } from "@/libs/server-fetcher";
import { TAddress, TAddressInput } from "@repo/utils/types";
import { revalidatePath } from "next/cache";

export const addAddress = async (payload: TAddressInput) => {
  const response = await serverFetcher<TAddress>("/addresses", {
    method: "POST",
    body: payload,
  });

  revalidatePath("/checkout");

  return response;
};

export const getAllMyAddresses = async () => {
  const response = await serverFetcher<TAddress[]>("/addresses");
  return response;
};
