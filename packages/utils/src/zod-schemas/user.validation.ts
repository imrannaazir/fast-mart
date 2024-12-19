import z from "zod";

export const profileUpdateValidation = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export const profileUpdateValidationSchema = z.object({
  body: profileUpdateValidation,
});
