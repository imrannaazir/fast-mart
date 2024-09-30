import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const isAuthenticated = (): boolean => {
  const token = cookies().get("accessToken")?.value;
  if (!token) return false;

  const decodedToken = jwtDecode(token as string);
  if (!decodedToken) return false;

  return true;
};
