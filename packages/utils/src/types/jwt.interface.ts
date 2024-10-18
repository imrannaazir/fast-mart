import { TRole } from "./user.interface";

export interface JwtPayload {
  userId: string;
  email: string;
  role: TRole;
  iat: number;
  exp: number;
}
