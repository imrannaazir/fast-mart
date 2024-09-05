import { Types } from "mongoose";
import { TImage } from "./image.interface";

export type TBrand = {
  _id?: string;
  name: string;
  description?: string;
  logo?: TImage;
  slogan?: string;
  cover_photo?: Types.ObjectId;
  noOfProducts?: number;
  createdBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
