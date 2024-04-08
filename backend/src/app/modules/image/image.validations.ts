import { z } from 'zod';

const imageValidationSchema = z.object({
  file_name: z.string(),
  size: z.number(),
  url: z.string(),
});

export const createSingleImageValidationSchema = z.object({
  body: imageValidationSchema,
});

export const createManyImageValidationSchema = z.object({
  body: z.object({
    images: z.array(imageValidationSchema),
  }),
});
