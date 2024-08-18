import z from "zod";
export const productValidationSchema = z.object({
  name: z.string(),
});
