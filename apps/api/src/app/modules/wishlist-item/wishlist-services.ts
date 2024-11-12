import { TWishlistItem } from '@repo/utils/types';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import Product from '../product/product.model';
import WishlistItem from './wishlist-item.model';

// add product in wishlist
const toggleProductInWishlist = async (
  payload: Pick<TWishlistItem, 'productId' | 'userId'>,
) => {
  // check if product is exist
  const isProductExist = await Product.findById(payload.productId);

  if (!isProductExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found!');
  }

  // check if product already exist in the wishlist for this user
  const isProductAlreadyInWishlist = await WishlistItem.findOne({
    userId: payload.userId,
    productId: payload.productId,
  });

  let message: string;

  if (isProductAlreadyInWishlist) {
    const result = await WishlistItem.deleteOne({
      userId: payload.userId,
      productId: payload.productId,
    });

    if (result.deletedCount === 0) {
      throw new AppError(
        StatusCodes.CONFLICT,
        'Failed to remove product from wishlist.',
      );
    }
    message = 'Product removed from wishlist.';
  } else {
    await WishlistItem.create({
      userId: payload.userId,
      productId: payload.productId,
    });
    message = 'Product added to wishlist.';
  }

  const myAllWishlistItems = await WishlistItem.find({
    userId: payload?.userId,
  });
  return { result: myAllWishlistItems, message };
};

// get all wishlist items of user
const getAllUserWishlistItems = async (userId: string) => {
  const result = await WishlistItem.find({
    userId,
  }).populate({
    path: 'productId',
    model: 'product',
    select: 'price  compare_price title',
    populate: 'media',
  });

  return result;
};
const WishlistItemServices = {
  toggleProductInWishlist,
  getAllUserWishlistItems,
};
export default WishlistItemServices;
