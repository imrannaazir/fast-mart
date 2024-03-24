import { z } from 'zod';

export const createOperatingSystemValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});
