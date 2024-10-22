import { TWishlistItem } from '@repo/utils/types';
import Product from '../product/product.model';
import { StatusCodes } from 'http-status-codes';
import WishlistItem from './wishlist-item.model';
import AppError from '../../errors/AppError';

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
  console.log(myAllWishlistItems, 'Here bro');
  return { result: myAllWishlistItems, message };
};

// get all wishlist items of user
const getAllUserWishlistItems = async (userId: string) => {
  const result = await WishlistItem.find({
    userId,
  });
  return result;
};
const WishlistItemServices = {
  toggleProductInWishlist,
  getAllUserWishlistItems,
};
export default WishlistItemServices;
