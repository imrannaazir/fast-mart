import z from "zod";
import { createCategorySchema } from "../zod-schemas/category.validation";
import { TCollection } from "./collection.interfaces";
import { TImage } from "./image.interface";

export type TCategory = {
  _id: string;
  title: string;
  collections: string[] | TCollection[];
  description?: string;
  image?: TImage;
  createdBy?: string;
  noOfProducts?: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TCategoryFieldsValues = z.infer<typeof createCategorySchema>;
