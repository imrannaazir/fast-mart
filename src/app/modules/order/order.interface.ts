import { Types } from 'mongoose';

export type TOrder = {
  buyer_name: string;
  quantity: number;
  soldAt: Date;
  product: Types.ObjectId;
  totalCost?: number;
  createdBy?: Types.ObjectId;
};
