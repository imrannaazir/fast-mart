import { TRole } from "./user.interface";

export interface JwtPayload {
  _id: string;
  email: string;
  role: TRole;
  iat: number;
  exp: number;
}
