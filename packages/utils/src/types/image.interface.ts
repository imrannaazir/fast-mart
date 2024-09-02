import { Types } from "mongoose";

export type TImage = {
  _id?: Types.ObjectId | string;
  file_name: string;
  url: string;
  size: number;
  format: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TDeleteManyReturnType = {
  acknowledged: boolean;
  deletedCount: number;
};
