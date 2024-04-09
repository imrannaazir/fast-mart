import { Types } from 'mongoose';

export type TCategory = {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
