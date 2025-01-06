import { z } from "zod";
export const createPaymentIntentValidationSchema = z.object({
  body: z.object({
    amount: z.number(),
  }),
});
