import { z } from "zod";
export const createCategorySchema = z.object({
  _id: z.string().optional(),
  title: z.string({ required_error: "Title is required." }),
  collections: z.array(z.string({ required_error: "Please select a collection." })),
  description: z.string().optional(),
  image: z.string().optional(),
});
export const createCategoryValidationSchema = z.object({
  body: createCategorySchema,
});
