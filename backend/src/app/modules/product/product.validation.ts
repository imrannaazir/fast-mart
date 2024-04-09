import { z } from 'zod';
import { ProductStatus, ProductUnit } from './product.constant';

const variantValidationSchema = z.object({
  variant: z.string(),
  options: z.array(z.string()),
});

export const createProductValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.number(),
    compare_price: z.number().optional(),
    status: z.enum(ProductStatus).optional(),
    weight: z.number().optional(),
    unit: z.enum(ProductUnit).optional(),
    quantity: z.number(),
    media: z.array(z.string()).optional(),
    brand: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    collections: z.array(z.string()).optional(),
    variants: z.array(variantValidationSchema).optional(),
  }),
});

export const deleteBulkProductValidationSchema = z.object({
  body: z.object({
    ids: z.array(z.string()),
  }),
});
