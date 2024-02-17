import { z } from 'zod';

export const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});
