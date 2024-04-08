import { z } from 'zod';
import { TImage } from './image.interface';

export const createImageValidationSchema = z.object({
  body: z.object({
    file_name: z.string(),
    size: z.number(),
    url: z.string(),
  }),
});
