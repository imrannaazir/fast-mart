import { TReviewInput } from '@repo/utils/types';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { OrderItem } from '../order/order.model';
import { Review } from './review.model';

const postReview = async (
  payload: TReviewInput,
  orderItemId: string,
  userId: string,
) => {
  const isOrderItemExist = await OrderItem.findOne({
    _id: orderItemId,
    userId,
  });

  if (!isOrderItemExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not founded.');
  }

  const review = await Review.create({
    ...payload,
    orderItemId,

    userId,
    productId: isOrderItemExist?.productId,
  });

  return review;
};

const ReviewServices = { postReview };

export default ReviewServices;
