import { jwtDecode, JwtPayload } from "jwt-decode";
import { cookies } from "next/headers";

export const isAuthenticated = (): boolean | string => {
  const token = cookies().get("accessToken")?.value;
  if (!token) return false;

  const decodedToken: any = jwtDecode(token as string);
  if (!decodedToken) return false;

  return decodedToken.userId as string;
};
