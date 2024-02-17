import { z } from 'zod';
const featureValidationSchema = z.record(z.string());
export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    description: z.string().optional(),
    weight: z.number().optional(),
    unit: z.string().optional(),
    compatibility: z.string().optional(),
    dimensions: z.string().optional(),
    image: z.string().optional(),
    brand: z.string(),
    category: z.string(),
    powerSource: z.string().optional(),
    operatingSystem: z.string().optional(),
    connectivity: z.string().optional(),
    tags: z.array(z.string()).optional(),
    features: featureValidationSchema.optional(),
  }),
});
