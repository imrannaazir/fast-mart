"use server";

import apiCall from "@/libs/api";
import { loginSchema, z } from "@repo/utils/zod-schemas";
import { cookies } from "next/headers";

export const userLogin = async (data: z.infer<typeof loginSchema>) => {
  const result = await apiCall<{ accessToken: string; refreshToken: string }>("/auth/login", {
    method: "POST",
    body: data,
    cache: "no-store",
  });

  if (result?.data?.accessToken && result?.data?.refreshToken) {
    cookies().set("accessToken", result?.data?.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    cookies().set("refreshToken", result?.data?.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  }
  return result;
};
