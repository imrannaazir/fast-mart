import { z } from "zod";

export const sellProductValidationSchema = z.object({
  buyer_name: z.string().min(3),
  quantity: z.coerce.number().gt(0),
  soldAt: z.date(),
});
