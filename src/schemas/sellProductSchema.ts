import { z } from "zod";

export const sellProductValidationSchema = z.object({
  buyer_name: z.string().min(3),
  quantity: z.union([z.string(), z.number()]),
  soldAt: z.date(),
});
