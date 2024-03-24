import { z } from 'zod';

export const createConnectivityValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});
