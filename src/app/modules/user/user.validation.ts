import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    email: z.string(),
  }),
});
