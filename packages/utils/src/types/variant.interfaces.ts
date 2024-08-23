import { Types } from "mongoose";

export type TVariant = {
  _id?: Types.ObjectId | string;
  variant_name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TOption = {
  _id?: Types.ObjectId | string;
  option_name: string;
  variantId: Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TProductVariantOption = {
  _id: Types.ObjectId | string;
  variantId: Types.ObjectId | string | TVariant;
  options: [Types.ObjectId];
};

export type TProductVariant = {
  _id: Types.ObjectId | string;
  productId: Types.ObjectId | string;
  productVariantOptions: [Types.ObjectId];
};
