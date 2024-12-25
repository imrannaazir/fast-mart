import { TCategory } from "./category.interface";
import { TIcon } from "./icons.interface";
import { TImage } from "./image.interface";

export type TCollection = {
  _id?: string;
  title: string;
  description?: string;
  image?: TImage;
  icon?: TIcon;
  categories?: TCategory[];
  noOfProducts?: number;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
