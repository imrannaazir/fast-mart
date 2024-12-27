"use server";

import { serverFetcher } from "@/libs/server-fetcher";
import { TOrder, TPlaceOrderInput } from "@repo/utils/types";
import { revalidatePath, revalidateTag } from "next/cache";

// place order
export const placeOrder = async (payload: TPlaceOrderInput) => {
  const response = await serverFetcher("/orders/place", {
    method: "POST",
    body: payload,
  });

  revalidatePath("/checkout");
  revalidatePath("/cart");
  revalidatePath("/");
  revalidateTag("cart");

  return response;
};

export const getSingleOrder = async (orderId: string) => {
  const response = await serverFetcher<TOrder>(`/orders/me/${orderId}`, {
    method: "GET",
    cache: "no-store",
  });

  return response;
};
