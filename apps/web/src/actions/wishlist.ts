"use server";
import apiCall from "@/libs/api";
import withAuth from "@/libs/with-auth";
import { wishlistItemSchema, z } from "@repo/utils/zod-schemas";

const addToWishlistAction = async (body: z.infer<typeof wishlistItemSchema>) => {
  const response = await apiCall("/wishlist-items/add", {
    method: "POST",
    body,
  });

  return response;
};

const getAllMyWishlistItemsAction = async (userId: string) => {
  const myWishlistItems = await apiCall(`/wishlist-items/${userId}`);
  return myWishlistItems;
};

export const getAllMyWishlistItems = withAuth(getAllMyWishlistItemsAction);

export const addToWishlist = withAuth(addToWishlistAction);
