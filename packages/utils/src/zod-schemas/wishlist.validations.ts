import z from "zod";

export const wishlistItemSchema = z.object({
  productId: z.string({ message: "Product Id is required!" }),
});

export const wishlistItemValidationSchema = z.object({
  body: wishlistItemSchema,
});
