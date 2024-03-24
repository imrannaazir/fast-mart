import { z } from 'zod';

export const createPowerSourceValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});
