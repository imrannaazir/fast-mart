import { z } from 'zod';

export const createOrderValidationSchema = z.object({
  body: z.object({
    buyer_name: z.string(),
    quantity: z.number().gt(0),
    soldAt: z.date(),
  }),
});
