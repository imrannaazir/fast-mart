import { z } from 'zod';

const userNameValidationSchema = z
  .object({
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
  })
  .optional();

export const registrationValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(4).max(30),
    name: userNameValidationSchema,
    profileImage: z.string().optional(),
  }),
});
