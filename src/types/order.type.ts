import { TProduct } from "./product.type";

export type TOrder = {
  _id?: string;
  buyer_name: string;
  products: { product: TProduct; quantity: number }[];
  quantity: number;
  totalCost: number;
  createdBy?: string;
  soldAt: string;
  createdAt?: string;
  updatedAt?: string;
};
