import z from "zod";

export const updateProductToCartValidation = z.object({
  body: z.object({
    productId: z.string(),
    type: z.enum(["add", "remove"]),
    options: z.array(z.string()).optional(),
  }),
});
