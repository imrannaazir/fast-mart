import { Types } from 'mongoose';

export type TImage = {
  _id?: Types.ObjectId;
  file_name: string;
  url: string;
  size: number;
  createdAt?: Date;
  updatedAt?: Date;
};
