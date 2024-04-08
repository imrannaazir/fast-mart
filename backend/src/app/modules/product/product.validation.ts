import { z } from 'zod';
import { ProductStatus, ProductUnit } from './product.constant';
export const createProductValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.number(),
    compare_price: z.number().optional(),
    status: z.enum(ProductStatus).optional(),
    weight: z.number().optional(),
    unit: z.enum(ProductUnit as [string, ...string[]]).optional(),
    quantity: z.number(),
    media: z.array(z.string()).optional(),
    brand: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    collections: z.array(z.string()).optional(),
    variants: z.array(z.string()).optional(),
  }),
});

export const deleteBulkProductValidationSchema = z.object({
  body: z.object({
    ids: z.array(z.string()),
  }),
});
