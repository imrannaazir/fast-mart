import z from "zod";
import { postReviewValidator } from "../zod-schemas/review.validations";

export type TReview = {
  _id: string;
  userId: string;
  orderItemId: string;
  productId: string;
  imageId?: string;
  rating: number;
  message: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TReply = {
  _id: string;
  reviewId: string;
  userId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export type TReviewInput = z.infer<typeof postReviewValidator>;
