import { Types } from 'mongoose';

export type TTag = {
  _id?: Types.ObjectId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TProductTag = {
  productId: Types.ObjectId;
  tagId: Types.ObjectId;
};
