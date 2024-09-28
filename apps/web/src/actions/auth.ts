"use server";

import fetcher from "@/libs/fetcher";
import { loginSchema, z } from "@repo/utils/zod-schemas";
import { cookies } from "next/headers";

export const userLogin = async (data: z.infer<typeof loginSchema>) => {
  const result = await fetcher<{ accessToken: string }>("/auth/login", {
    method: "POST",
    body: data,
  });

  if (result?.data?.accessToken) {
    cookies().set("accessToken", result?.data?.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  }
  return result;
};
