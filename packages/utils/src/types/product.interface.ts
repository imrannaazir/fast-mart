import { Types } from "mongoose";
import { ProductStatus, ProductUnit } from "../constants/product.constant";
import { TImage } from "./image.interface";
import { TProductVariant } from "./variant.interfaces";
import { TCategory } from "./category.interface";
import { TCollection } from "./collection.interfaces";
import { TBrand } from "./brand.interface";
import { TTag } from "./tag.interface";

export type TProductStatus = (typeof ProductStatus)[number];
export type TProductUnit = (typeof ProductUnit)[number];
export type TInputVariant = {
  variantId: Types.ObjectId;
  options: [Types.ObjectId];
};

export type TProduct = {
  _id?: Types.ObjectId;

  title: string;
  price: number;

  compare_price?: number;
  description?: string;
  status: TProductStatus;
  quantity?: number;
  weight?: number;
  unit: TProductUnit;

  media?: [Types.ObjectId] | TImage[];
  variants?: [TInputVariant] | Types.ObjectId[] | TProductVariant[];
  categories?: [Types.ObjectId] | TCategory[];
  collections?: [Types.ObjectId] | TCollection[];
  brand?: Types.ObjectId | TBrand;
  tags?: [Types.ObjectId] | TTag[];
  createdBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
