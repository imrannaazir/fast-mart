import { TReply, TReview } from '@repo/utils/types';
import mongoose, { model, Schema } from 'mongoose';
import { Order } from '../order/order.model';
import Product from '../product/product.model';
import User from '../user/user.model';

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    orderItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Order,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      required: true,
    },
    imageId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

const replySchema = new Schema(
  {
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Review = model<TReview>('review', reviewSchema);
export const Reply = model<TReply>('reply', replySchema);
