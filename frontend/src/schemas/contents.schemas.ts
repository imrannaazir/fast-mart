import { z } from "zod";

export const createCollectionValidationSchema = z.object({
  title: z.string({ required_error: "Please enter a title." }),
  description: z.string().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
});
