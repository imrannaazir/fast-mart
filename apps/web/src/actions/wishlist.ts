"use server";

import fetcher from "@/libs/fetcher";
import { wishlistItemSchema, z } from "@repo/utils/zod-schemas";

export const addToWishlist = async (productId: z.infer<typeof wishlistItemSchema>) => {
  const result = await fetcher("/wishlist-items/add", {
    method: "POST",
    body: {
      productId,
    },
  });

  console.log({ result });
};
