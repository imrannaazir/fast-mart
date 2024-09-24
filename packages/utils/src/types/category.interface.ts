import { Types } from "mongoose";
import { TImage } from "./image.interface";
import { TCollection } from "./collection.interfaces";

export type TCategory = {
  _id: string;
  title: string;
  collections: string[] | TCollection[];
  description?: string;
  image?: TImage;
  createdBy: Types.ObjectId;
  noOfProducts?: number;
  createdAt: Date;
  updatedAt: Date;
};
