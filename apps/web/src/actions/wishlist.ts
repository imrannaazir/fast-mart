"use server";

import apiCall from "@/libs/api";
import { wishlistItemSchema, z } from "@repo/utils/zod-schemas";

export const addToWishlist = async (body: z.infer<typeof wishlistItemSchema>) => {
  const response = await apiCall("/wishlist-items/add", {
    method: "POST",
    body,
  });

  return response;
};
