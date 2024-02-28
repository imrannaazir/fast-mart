import { z } from "zod";

export const addProductFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  brand: z.string(),
  category: z.string(),
  price: z.string(),
  quantity: z.string(),
  weight: z.string(),
  unit: z.string(),
  dimensions: z.string(),
  operatingSystem: z.string(),
  powerSource: z.string(),
  connectivity: z.string(),
  tags: z.array(z.string()),
  features: z.record(z.string(), z.string()),
  featureName: z.string().regex(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/),
});

export type TProductFormValues = z.infer<typeof addProductFormSchema>;
