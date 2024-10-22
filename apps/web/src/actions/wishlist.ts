"use server";
import { authOptions } from "@/libs/auth";
import { serverFetcher } from "@/libs/server-fetcher";
import { TWishlistItem } from "@repo/utils/types";
import { wishlistItemSchema, z } from "@repo/utils/zod-schemas";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const toggleProductInWishlist = async (body: z.infer<typeof wishlistItemSchema>) => {
  revalidatePath("/");
  revalidatePath("/wishlist");
  const response = await serverFetcher<TWishlistItem[]>("/wishlist-items/toggle", {
    method: "POST",
    body,
  });

  return response;
};

// get current user wishlist items
export const getAllMyWishlistItems = cache(async () => {
  const session = await getServerSession(authOptions);

  if (session?.user?.userId) {
    const myWishlistItems = await serverFetcher<TWishlistItem[]>(`/wishlist-items/${session?.user?.userId}`, {});
    return myWishlistItems?.data;
  } else {
    return [];
  }
});
