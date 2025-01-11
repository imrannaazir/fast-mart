import { z } from "zod";
export const createBrandSchema = z.object({
  _id: z.string().optional(),
  name: z.string({ required_error: "Name is required." }),
  description: z.string().optional(),
  slogan: z.string().optional(),
  logo: z.string().optional(),
  cover_photo: z.string().optional(),
});
export const createBrandValidationSchema = z.object({
  body: createBrandSchema,
});
