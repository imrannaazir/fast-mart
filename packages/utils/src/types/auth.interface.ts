import z from "zod";
import { changeAdminPasswordValidationSchema } from "../zod-schemas/auth.validation";

export type TLoginUser = {
  email: string;
  password: string;
};

export type TChangePasswordPayload = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export type TChangePasswordFieldValues = z.infer<typeof changeAdminPasswordValidationSchema>;

export type TSession = {
  id: number;
  userId: string;
  sessionToken: string;
  expiresAt: Date;
  createAt: Date;
  updatedAt: Date;
};

export type TRefreshToken = {
  id: number;
  userId: string;
  token: string;
  expiresAt: Date;
  createAt: Date;
  updatedAt: Date;
};
