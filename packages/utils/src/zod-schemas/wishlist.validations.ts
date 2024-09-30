import z from "zod";

export const wishlistItemSchema = z.object({
  productId: z.string(),
});

export const wishlistItemValidationSchema = z.object({
  body: wishlistItemSchema,
});
