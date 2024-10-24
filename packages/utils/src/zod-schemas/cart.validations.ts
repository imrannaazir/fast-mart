import z from "zod";

export const updateProductToCartValidation = z.object({
  body: z.object({
    product: z.string(),
    type: z.enum(["add", "remove", "decrement"]),
    options: z.array(z.string()).optional(),
  }),
});
