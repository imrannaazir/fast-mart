import { TImage } from "./image.types";

export type TBrand = {
  _id?: string;
  name: string;
  description?: string;
  logo?: TImage;
  slogan?: string;
  cover_photo?: TImage;
  noOfProducts?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
