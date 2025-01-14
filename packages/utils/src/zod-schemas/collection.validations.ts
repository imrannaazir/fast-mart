import { z } from "zod";

export const createCollectionSchema = z.object({
  _id: z.string().optional(),
  title: z.string({ required_error: "Please enter a title." }),
  description: z.string().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
});

export const createCollectionValidationSchema = z.object({
  body: createCollectionSchema,
});

export //zod validation schema
const nameValidationSchema = z
  .string()
  .min(2, {
    message: "Name must be at least 2 characters.",
  })
  .optional();

export const keyValidationSchema = z
  .string()
  .regex(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/, {
    message: "Invalid name. Valid name example feature_name or featureName",
  })
  .optional();
