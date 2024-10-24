import { TProduct } from "./product.interface";

export type TCartItem = {
  _id: string;
  user: string;
  product: string | TProduct;
  options?: string[];
  quantity: number;
  type: CartActionType;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CartActionType = "add" | "decrement" | "remove";

export type TCartItemInput = Omit<TCartItem, "_id" | "updatedAt" | "createdAt" | "quantity">;

export type TCartStateItem = {
  _id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  quantity: number;
  productImg?: string;
  options?: string[];
};
