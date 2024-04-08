import { Types } from 'mongoose';

export type TCategory = {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type TProductCategory = {
  _id?: Types.ObjectId;
  productId: Types.ObjectId;
  categoryId: Types.ObjectId;
};
