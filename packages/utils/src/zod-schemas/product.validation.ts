import { ProductStatus, ProductUnit } from "@repo/utils/constants";
import { z } from "zod";

const variantValidationSchema = z.object({
  variantId: z.string(),
  options: z.array(z.string()),
});

export const createProductSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  media: z.array(z.string()).optional(),

  price: z.coerce.number().gte(0),
  compare_price: z.coerce.number().optional(),
  quantity: z.coerce.number().gte(0).optional(),

  weight: z.coerce.number().optional(),
  unit: z.enum(ProductUnit).optional(),

  variants: z.array(variantValidationSchema).optional(),
  variant: variantValidationSchema.optional(),

  status: z.enum(Object.values(ProductStatus) as [string]).optional(),

  brand: z.string().optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  collections: z.array(z.string()).optional(),
});

export const createProductValidationSchema = z.object({
  body: createProductSchema,
});

export const deleteBulkProductValidationSchema = z.object({
  body: z.object({
    ids: z.array(z.string()),
  }),
});
