"use server";
import { fetcher } from "@/libs/fetcher";
import { serverFetcher } from "@/libs/server-fetcher";
import { wishlistItemSchema, z } from "@repo/utils/zod-schemas";
import { getServerSession } from "next-auth";

export const addToWishlist = async (body: z.infer<typeof wishlistItemSchema>) => {
  const response = await serverFetcher("/wishlist-items/add", {
    method: "POST",
    body,
  });

  return response;
};

export const getAllMyWishlistItems = async () => {
  const session = await getServerSession();
  if (session?.user?.userId) {
    const myWishlistItems = await fetcher(`/wishlist-items/${session?.user?.userId}`);
    return myWishlistItems;
  } else {
    return [];
  }
};
