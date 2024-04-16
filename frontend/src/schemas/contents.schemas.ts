import { z } from "zod";

export const createCollectionValidationSchema = z.object({
  title: z.string({ required_error: "Please enter a title." }),
  description: z.string().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
});

export const createCategoryValidationSchema = z.object({
  title: z.string({ required_error: "Title is required." }),
  collection: z.string({ required_error: "Please select a collection." }),
  image: z.string().optional(),
  description: z.string().optional(),
});
