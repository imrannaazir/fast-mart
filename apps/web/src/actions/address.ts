"use server";

import { serverFetcher } from "@/libs/server-fetcher";
import { TAddress, TAddressInput } from "@repo/utils/types";
import { revalidatePath } from "next/cache";

export const getAllMyAddresses = async () => {
  const response = await serverFetcher<TAddress[]>("/addresses");
  return response;
};

export const addAddress = async (payload: TAddressInput) => {
  revalidatePath("/checkout");
  const response = await serverFetcher<TAddress>("/addresses", {
    method: "POST",
    body: payload,
  });

  return response;
};

export const deleteAddress = async (addressId: string) => {
  revalidatePath("/checkout");
  const response = await serverFetcher<{ deletedCount: number }>(`/addresses/${addressId}`, {
    method: "DELETE",
  });

  return response;
};

export const markAsDefaultAddress = async (addressId: string) => {
  revalidatePath("/checkout");
  const response = await serverFetcher<TAddress>(`/addresses/${addressId}`, {
    method: "PATCH",
  });

  return response;
};
