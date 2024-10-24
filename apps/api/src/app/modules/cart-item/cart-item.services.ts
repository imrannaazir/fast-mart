import { TCartItem, TCartItemInput } from '@repo/utils/types';
import Product from '../product/product.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { Option } from '../variant/variant.model';
import CartItem from './cart-item.model';
import { UpdateQuery } from 'mongoose';

// update product to cart
const updateProductToCart = async (payload: TCartItemInput) => {
  const { options, product, type, user } = payload || {};

  //   check is product exists
  const isProductExist = await Product.findById(product);
  if (!isProductExist)
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found!');

  // check options are exist
  if (options?.length) {
    const countOptions = await Option.countDocuments({
      _id: { $in: options },
    });

    if (countOptions !== options?.length) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        'One or more options not found!',
      );
    }
  }

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
    { user, product },
    updateData,
    { upsert: true, new: true, runValidators: true },
  ).populate('options');

  // delete item from cart if quantity is 0
  if (cartItem && cartItem.quantity <= 0) {
    await CartItem.findByIdAndDelete(cartItem._id);
  }

  // get all cart item of user
  const cartItems = await CartItem.find({
    user,
  }).populate('product');

  return cartItems;
};

// get all cart items of user
const getAllMyCartItems = async (userId: string) => {
  const cartItems = await CartItem.find({}).populate('product');
  return cartItems;
};

const CartItemServices = { updateProductToCart, getAllMyCartItems };
export default CartItemServices;
