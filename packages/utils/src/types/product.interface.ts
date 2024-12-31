import { ProductStatus, ProductUnit } from "../constants/product.constant";
import { TBrand } from "./brand.interface";
import { TCategory } from "./category.interface";
import { TCollection } from "./collection.interfaces";
import { TImage } from "./image.interface";
import { TTag } from "./tag.interface";
import { TUser } from "./user.interface";
import { TProductVariant } from "./variant.interfaces";

export type TProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];
export type TProductUnit = (typeof ProductUnit)[number];
export type TInputVariant = {
  variantId: string;
  options: string[];
};

export type TProduct = {
  _id?: string;

  title: string;
  price: number;

  compare_price?: number;
  description?: string;
  status: TProductStatus;
  quantity?: number;
  weight?: number;
  unit: TProductUnit;

  media?: TImage[];
  variants?: [TInputVariant] | string[] | TProductVariant[];
  categories?: TCategory[];
  collections?: TCollection[];
  brand?: TBrand;
  tags?: TTag[];
  createdBy?: TUser | string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TTopProduct = Pick<TProduct, "_id" | "title" | "price" | "media"> & { sales: number };
