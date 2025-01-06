import {
  TOrderItemPayload,
  TOrderPayload,
  TPaymentTransaction,
  TPlaceOrderInput,
  TProduct,
} from '@repo/utils/types';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../config';
import CartItem from '../cart-item/cart-item.model';
import { Option } from '../variant/variant.model';

import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import PaymentTransaction from '../paymentTransaction/payment-transaction.model';
import { Order, OrderItem } from './order.model';

const placeOrder = async (payload: TPlaceOrderInput, userId: string) => {
  const orderPayload: TOrderPayload = {
    addressId: payload.addressId,
    userId: userId,
    status: 'PLACED',
    paymentStatus: payload?.transactionId ? 'PAID' : 'UNPAID',
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

    // create transaction
    let transaction;
    if (payload?.transactionId) {
      const transactionPayload: Omit<
        TPaymentTransaction,
        '_id' | 'createdAt' | 'updatedAt'
      > = {
        amount: orderPayload.netAmount,
        paymentType: payload.paymentType,
        transactionId: payload.transactionId,
        orderId: newOrder?.[0]?._id,
      };
      transaction = await PaymentTransaction.create([transactionPayload], {
        session,
      });
    }

    if (transaction) {
      await Order?.findByIdAndUpdate(
        newOrder?.[0]?._id,
        { transaction: transaction?.[0]?._id },
        {
          session,
        },
      );
    }

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
    return newOrder;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error?.message);
  }
};

const getMyOrders = async (userId: string) => {
  const orders = await Order.aggregate([
    {
      $match: { userId },
    },
    // Step 1: Lookup to populate OrderItems for each Order
    {
      $lookup: {
        from: 'orderitems', // Collection name for OrderItem
        localField: '_id',
        foreignField: 'orderId',
        as: 'orderItems',
      },
    },
    // Step 2: Unwind the orderItems array for further lookups
    {
      $unwind: {
        path: '$orderItems',
        preserveNullAndEmptyArrays: true,
      },
    },
    // Step 3: Lookup to populate Product data in each OrderItem
    {
      $lookup: {
        from: 'products', // Collection name for Product
        localField: 'orderItems.productId',
        foreignField: '_id',
        as: 'orderItems.product',
      },
    },
    // Step 4: Unwind the Product array (one product per orderItem)
    {
      $unwind: {
        path: '$orderItems.product',
        preserveNullAndEmptyArrays: true,
      },
    },

    // Step 5: Lookup to populate Media for the Product's media field
    {
      $lookup: {
        from: 'images', // Collection name for Media
        localField: 'orderItems.product.media', // Assuming Product has a field `media` with media IDs
        foreignField: '_id',
        as: 'orderItems.product.media',
      },
    },

    // Step 5: Lookup to populate Options for the OrderItem's optionIds
    {
      $lookup: {
        from: 'options', // Collection name for Option
        localField: 'orderItems.optionIds',
        foreignField: '_id',
        as: 'orderItems.options',
      },
    },
    // Step 6: Group back all OrderItems into an array for each Order
    {
      $group: {
        _id: '$_id',
        addressId: { $first: '$addressId' },
        userId: { $first: '$userId' },
        paymentStatus: { $first: '$paymentStatus' },
        status: { $first: '$status' },
        paymentType: { $first: '$paymentType' },
        totalAmount: { $first: '$totalAmount' },
        orderItems: {
          $push: {
            _id: '$orderItems._id',
            product: '$orderItems.product',
            options: '$orderItems.options',
            price: '$orderItems.price',
            quantity: '$orderItems.quantity',
            totalAmount: '$orderItems.totalAmount',
          },
        },
      },
    },
    // Optional: Lookup to get User data for the Order
    {
      $lookup: {
        from: 'users', // Collection name for User
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
        preserveNullAndEmptyArrays: true,
      },
    },
    // Optional: Project the final fields you want
    {
      $project: {
        _id: 1,
        addressId: 1,
        user: { name: '$user.name', email: '$user.email' }, // Simplified user data
        totalAmount: 1,
        paymentType: 1,
        paymentStatus: 1,
        status: 1,
        orderItems: 1,
      },
    },
  ]);

  return orders;
};

const getMyOrderById = async (orderId: string, userId: string) => {
  const order = await Order.findOne({
    _id: orderId,
    userId,
  });
  if (!order) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are unauthorized.');
  }

  return order;
};

const getAllAdminOrders = async (query: Record<string, unknown>) => {
  const orderModelQuery = new QueryBuilder(
    Order.find().populate({
      path: 'userId',
      select: 'firstName lastName email',
    }),
    query,
  )
    .filter()
    .sort()
    .fields()
    .paginate();

  const data = await orderModelQuery.modelQuery;

  const meta = await orderModelQuery.countTotal();

  return { data, meta };
};

const getAdminOrderById = async (orderId: string) => {
  const order = await Order.findOne({
    _id: orderId,
  });
  return order;
};

const OrderServices = {
  placeOrder,
  getMyOrders,
  getMyOrderById,
  getAllAdminOrders,
  getAdminOrderById,
};

export default OrderServices;
