import { Types } from 'mongoose';

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TRole = 'user' | 'manager';

export type TUser = {
  _id?: Types.ObjectId;
  name?: TName;
  email: string;
  password: string;
  role?: TRole;
  profileImage?: string;
  phoneNumber?: string;
  passwordChangeAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
