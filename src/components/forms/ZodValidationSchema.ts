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
  featureName: z.string().optional(),
  features: z.record(z.string(), z.string()),
});

export type TProductFormValues = z.infer<typeof addProductFormSchema>;
