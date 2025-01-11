import { z } from "zod";
import { Role } from "../constants/user.constant";

export const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(30),
  firstName: z.string(),
  lastName: z.string(),
});

export const registrationValidationSchema = z.object({
  body: registrationSchema,
});

export const registerValidation = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
    role: z.enum(Object.keys(Role) as [string, ...string[]]).optional(),
  }),
});

export const verifyAccountValidationSchema = z.object({
  body: z.object({
    token: z.string({ required_error: "Token is required." }),
  }),
});

export const resentVerificationEmailSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
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
});
export const loginValidationSchema = z.object({
  body: loginSchema,
});

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string().optional(),
  }),
});

export const changePasswordValidationSchema = z.object({
  password: z.string(),
  oldPassword: z.string(),
});

export const changePasswordValidationSchemaApi = z.object({
  body: changePasswordValidationSchema,
});

export const changeAdminPasswordValidationSchema = z
  .object({
    password: z
      .string({ required_error: "Current password is required ." })
      .min(8, { message: "Current password must be at least character." })
      .max(30, { message: "Current password must be more then 30 character." }),
    oldPassword: z
      .string({ required_error: "New password is required." })
      .min(8, { message: "New password must be at least 8 character." })
      .max(30, { message: "new password must be more then 30 character." }),
    confirmPassword: z.string({ required_error: "Confirm password is required." }),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Password did not match.",
    path: ["confirmPassword"],
  });
