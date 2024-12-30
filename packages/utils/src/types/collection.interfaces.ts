import { TCategory } from "./category.interface";
import { TImage } from "./image.interface";

export type TCollection = {
  _id?: string;
  title: string;
  description?: string;
  image?: TImage;
  icon?: string;
  categories?: TCategory[];
  noOfProducts?: number;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
