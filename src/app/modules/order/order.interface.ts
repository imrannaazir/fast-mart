import { Types } from 'mongoose';

export type TOrderedProduct = {
  product: Types.ObjectId;
  quantity: number;
};

export type TOrder = {
  buyer_name: string;
  soldAt: Date;
  products: TOrderedProduct[];
  totalCost: number;
  createdBy?: Types.ObjectId;
};
