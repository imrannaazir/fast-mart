import { TImage } from "./contents.type";

export type TIcon = {
  _id: string;
  name: string;
  __v: number;
};
export type TCollection = {
  title: string;
  description?: string;
  icon?: TIcon;
  image?: TImage;
  noOfProducts: number;
  createdBy: string;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
