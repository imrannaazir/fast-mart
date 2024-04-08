import { Types } from 'mongoose';

export type TImage = {
  _id?: string;
  file_name: string;
  url: string;
  size: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TProductImage = {
  _id?: Types.ObjectId;
  productId: Types.ObjectId;
  imageId: Types.ObjectId;
};
