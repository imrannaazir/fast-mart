"use server";

import { serverFetcher } from "@/libs/server-fetcher";
import { CartActionType, TCartItem } from "@repo/utils/types";
import { revalidatePath } from "next/cache";

export const updateCart = async (productId: string, options: string[], type: CartActionType) => {
  const response = await serverFetcher<TCartItem[]>("/cart-items/update", {
    method: "PUT",
    body: {
      product: productId,
      options,
      type,
    },
  });
  return response;
};

export const getMyCartList = async () => {
  revalidatePath("/");
  revalidatePath("/cart");
  const response = await serverFetcher<TCartItem[]>("/cart-items");
  return response.data;
};
