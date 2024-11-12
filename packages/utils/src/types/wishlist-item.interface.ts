import { TImage } from "./image.interface";

export type TWishlistItemProduct = {
  _id: string;
  title: string;
  media: TImage[];
  price: number;
  compare_price: number;
};

export type TWishlistItem = {
  _id: string;
  userId: string;
  productId: string | TWishlistItemProduct;
  createdAt?: Date;
  updatedAt?: Date;
};
