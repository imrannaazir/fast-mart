"use server";

import { serverFetcher } from "@/libs/server-fetcher";
import { CartActionType, TCartItem } from "@repo/utils/types";
import { revalidatePath } from "next/cache";

// update cart
export const updateCart = async (productId: string, options: string[], type: CartActionType) => {
  const response = await serverFetcher<TCartItem[]>("/cart-items/update", {
    method: "PUT",
    body: {
      product: productId,
      options,
      type,
    },
  });
  revalidatePath("/");
  revalidatePath("/cart");
  return response;
};

// clear list
export const clearCartList = async () => {
  const response = await serverFetcher("/cart-items/clear", { method: "DELETE" });
  revalidatePath("/");
  revalidatePath("/cart");
  return response;
};

// cart list
export const getMyCartList = async () => {
  const response = await serverFetcher<TCartItem[]>("/cart-items");
  return response.data;
};
