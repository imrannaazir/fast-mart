import { Types } from "mongoose";

export type TTag = {
  _id?: string | Types.ObjectId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};
