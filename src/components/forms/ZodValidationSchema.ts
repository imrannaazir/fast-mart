import { z } from "zod";

export const addProductFormSchema = z.object({
  name: z.string().email().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 4 characters.",
  }),
  brand: z.string(),
});

export type TProductFormValues = z.infer<typeof addProductFormSchema>;
