import { Role } from "@repo/utils/constants";
import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});
export const registrationSchema = z.object({
  email: z.string().email(),
  user: z.enum(Role).optional(),
  role: z.enum(Role).optional(),
  password: z.string().min(4).max(30),
  name: userNameValidationSchema,
  profileImage: z.string().optional(),
});

export const registrationValidationSchema = z.object({
  body: registrationSchema,
});
export const loginSchema = z.object({
  email: z.string().email().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(4, {
      message: "Password must be at lest 4 character.",
    })
    .max(30),
  role: z.enum(Role).optional(),
  name: userNameValidationSchema.optional(),
});
export const loginValidationSchema = z.object({
  body: loginSchema,
});

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string(),
  }),
});
