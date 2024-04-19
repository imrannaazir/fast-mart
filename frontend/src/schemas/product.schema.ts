import { ProductStatus, ProductUnit } from "@/constant/product.constant";
import { z } from "zod";

const variantValidationSchema = z.object({
  variant: z.object({
    variant_name: z.string(),
    _id: z.string(),
  }),
  options: z.array(z.string()),
});

export const createProductValidationSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.number().gte(0),
  compare_price: z.number().optional(),
  status: z.enum(ProductStatus).optional(),
  weight: z.number().optional(),
  unit: z.enum(ProductUnit).optional(),
  quantity: z.number().gte(0).optional(),
  media: z.array(z.string()).optional(),
  brand: z.string().optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  collections: z.array(z.string()).optional(),
  variants: z.array(variantValidationSchema).optional(),
  variant: variantValidationSchema,
});

export type TProductFormValues = z.infer<typeof createProductValidationSchema>;
