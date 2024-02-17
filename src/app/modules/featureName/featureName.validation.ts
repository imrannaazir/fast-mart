import { z } from 'zod';

export const createFeatureNameValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});
