import { Types } from "mongoose";
import z from "zod";
import { createBrandSchema } from "../zod-schemas/brand.validation";
import { TImage } from "./image.interface";

export type TBrand = {
  _id?: string;
  name: string;
  description?: string;
  logo?: TImage | string;
  slogan?: string;
  cover_photo?: TImage | string;
  noOfProducts?: number;
  createdBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TBrandFieldValues = z.infer<typeof createBrandSchema>;
