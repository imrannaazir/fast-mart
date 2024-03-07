import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import Product from '../product/product.model';
import { TOrder } from './order.interface';
import mongoose from 'mongoose';
import Order from './order.model';

const createOrder = async (payload: TOrder) => {
  const { product, quantity } = payload;

  // check is product exist
  const isProductExist = await Product.findById(product);
  if (!isProductExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not founded.');
  }

  // if order quantity is more than product quantity
  if (quantity > isProductExist.quantity) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Requested quantity exceeds available stock.',
    );
  }

  // transaction and rollback
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create order
    const order = await Order.create([payload], { session });
    if (!order[0]) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create order.');
    }

    // update product
    const updatedProduct = await Product.findByIdAndUpdate(
      isProductExist._id,
      {
        $inc: { quantity: -order[0].quantity },
        status:
          isProductExist.quantity - payload.quantity === 0
            ? 'out-of-stock'
            : 'in-stock',
      },
      { session, new: true, runValidators: true },
    );

    if (!updatedProduct) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to processing order.',
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return order;
  } catch (error) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create a order.');
  }
};

const OrderService = {
  createOrder,
};

export default OrderService;
