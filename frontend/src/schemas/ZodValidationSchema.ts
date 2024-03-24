import { z } from "zod";

export const addOrEditProductFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  brand: z.string(),
  category: z.string(),
  price: z.union([z.string(), z.number()]),
  quantity: z.union([z.string(), z.number()]),
  weight: z.union([z.string(), z.number()]),
  unit: z.string(),
  compatibility: z.string().optional(),
  dimensions: z.string(),
  image: z.string().optional(),
  powerSource: z.string(),
  operatingSystem: z.string(),
  connectivity: z.string(),
  tags: z.array(z.string()),
  features: z.record(z.string(), z.string()),
  featureName: z.string().optional(),
});

export type TProductFormValues = z.infer<typeof addOrEditProductFormSchema>;
