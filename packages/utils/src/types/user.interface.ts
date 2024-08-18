import { Types } from "mongoose";
import { Role, UserStatus } from "../constants/user.constant";

export type TRole = (typeof Role)[number];
export type TUserStatus = (typeof UserStatus)[number];

export type TUser = {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  role: TRole;
  status: TUserStatus;
  phone_number?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
