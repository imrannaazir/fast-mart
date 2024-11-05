"use server";

import { serverFetcher } from "@/libs/server-fetcher";
import { TPlaceOrderInput } from "@repo/utils/types";
import { revalidatePath } from "next/cache";

// place order
export const placeOrder = async (payload: TPlaceOrderInput) => {
  const response = await serverFetcher("/orders/place", {
    method: "POST",
    body: payload,
  });

  revalidatePath("/checkout");
  revalidatePath("/cart");
  revalidatePath("/");

  return response;
};
