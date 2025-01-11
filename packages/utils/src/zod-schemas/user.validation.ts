import z from "zod";

export const profileUpdateValidation = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.coerce.date(),
  phoneNumber: z.string().optional(),
  photo: z.string().optional(),
});

export const profileUpdateValidationSchema = z.object({
  body: profileUpdateValidation,
});
