import {
  TOrderItemPayload,
  TOrderPayload,
  TPlaceOrderInput,
  TProduct,
} from '@repo/utils/types';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../config';
import CartItem from '../cart-item/cart-item.model';
import { Option } from '../variant/variant.model';

import AppError from '../../errors/AppError';
import { Order, OrderItem } from './order.model';

// place order
const placeOrder = async (payload: TPlaceOrderInput, userId: string) => {
  const orderPayload: TOrderPayload = {
    addressId: payload.addressId,
    userId: userId,
    status: 'PLACED',
    paymentStatus: 'UNPAID',
    paymentType: payload.paymentType,
    shippingAmount: Number(config.shipping_amount),
  };

  const cartList = await CartItem.find({
    _id: {
      $in: payload.cartItemIds,
    },
  }).populate({
    path: 'product',
  });

  orderPayload.totalAmount = cartList?.reduce(
    (prev, acc) =>
      prev + (acc.product as TProduct)!.compare_price! * acc.quantity,
    0,
  );

  orderPayload.grossAmount = cartList?.reduce(
    (prev, acc) => prev + (acc.product as TProduct).price * acc.quantity,
    0,
  );

  orderPayload.discountAmount =
    orderPayload.totalAmount - orderPayload.grossAmount;
  orderPayload.netAmount =
    orderPayload.grossAmount + orderPayload.shippingAmount!;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newOrder = await Order.create([orderPayload], {
      session,
    });

    const orderItems: TOrderItemPayload[] = await Promise.all(
      cartList.map(async (cartItem) => {
        const optionNames = cartItem.options?.map((option) => {
          return option.split('=')[1];
        });

        const options = await Option.find({
          option_name: {
            $in: optionNames,
          },
        });
        const orderItemPayload: TOrderItemPayload = {
          orderId: newOrder[0]?._id,
          productId: (cartItem.product as TProduct)._id,
          price: (cartItem.product as TProduct).price,
          quantity: cartItem.quantity,
          totalAmount: (cartItem.product as TProduct).price * cartItem.quantity,
          optionIds: options?.map((option) => option._id),
        };

        return orderItemPayload;
      }),
    );

    await OrderItem.insertMany(orderItems, { session });
    await CartItem.deleteMany({
      _id: {
        $in: payload.cartItemIds,
      },
    });
    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error?.message);
  }
};

const OrderServices = { placeOrder };

export default OrderServices;
