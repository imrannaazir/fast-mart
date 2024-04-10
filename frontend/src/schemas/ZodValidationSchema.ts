import { z } from "zod";

export const addOrEditProductFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  brand: z.string(),
  category: z.array(z.string()),
  price: z.union([z.string(), z.number()]),
  quantity: z.union([z.string(), z.number()]),
  weight: z.union([z.string(), z.number()]),
  unit: z.string(),
  image: z.array(z.string()).optional(),
  tags: z.array(z.string()),
});

export type TProductFormValues = z.infer<typeof addOrEditProductFormSchema>;
