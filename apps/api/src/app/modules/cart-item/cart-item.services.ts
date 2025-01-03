import { TCartItem, TCartItemInput } from '@repo/utils/types';
import { StatusCodes } from 'http-status-codes';
import { UpdateQuery } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import Product from '../product/product.model';
import CartItem from './cart-item.model';

// update product to cart
const updateProductToCart = async (payload: TCartItemInput) => {
  const { options, product, type, user } = payload || {};

  //   check is product exists
  const isProductExist = await Product.findById(product);
  if (!isProductExist)
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found!');

  // check options are exist

  /* if (options?.length) {
    const countOptions = await Option.countDocuments({
      _id: { $in: options },
    });

    if (countOptions !== options?.length) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        'One or more options not found!',
      );
    }
  } */

  //   update product to cart
  const updateData: UpdateQuery<TCartItem> = {
    product,
    user,
    options,
    ...(type === 'remove'
      ? { quantity: 0 }
      : { $inc: { quantity: type === 'add' ? 1 : -1 } }),
  };
  const cartItem = await CartItem.findOneAndUpdate(
    { user, product, options },
    updateData,
    { upsert: true, new: true, runValidators: true },
  );

  // delete item from cart if quantity is 0
  if (cartItem && cartItem.quantity <= 0) {
    await CartItem.findByIdAndDelete(cartItem._id);
  }

  // get all cart item of user
  const cartItemsQuery = new QueryBuilder(
    CartItem.find({ user }).populate({
      path: 'product',
      populate: 'media',
    }),
    {},
  ).sort();

  return await cartItemsQuery.modelQuery;
};

// clear cart list
const clearCartList = async (userId: string) => {
  const cartCount = await CartItem.countDocuments({ user: userId });
  if (cartCount < 1) {
    throw new AppError(StatusCodes.CONFLICT, 'No cart item founded.');
  }
  const deletedCartList = await CartItem.deleteMany({ user: userId });
  if (deletedCartList.deletedCount < 1) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to clear the cart.',
    );
  }
  return [];
};

// get all cart items of user
const getAllMyCartItems = async (userId: string) => {
  const cartModelQuery = new QueryBuilder(
    CartItem.find({ user: userId }).populate({
      path: 'product',
      populate: 'media',
    }),
    {},
  ).sort();

  return await cartModelQuery.modelQuery;
};

const CartItemServices = {
  updateProductToCart,
  getAllMyCartItems,
  clearCartList,
};
export default CartItemServices;
