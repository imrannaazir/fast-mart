import { Role, UserStatus } from "../constants/user.constant";
import { TImage } from "./image.interface";

export type TRole = (typeof Role)[keyof typeof Role];
export type TUserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export type TUser = {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  photo?: TImage;
  dateOfBirth?: string;
  password?: string;
  role: TRole;
  status: TUserStatus;
  phoneNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TUpdateUserPayload = Pick<TUser, "firstName" | "lastName" | "phoneNumber" | "dateOfBirth">;
