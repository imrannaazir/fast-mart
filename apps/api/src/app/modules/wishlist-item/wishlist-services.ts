import { TWishlistItem } from '@repo/utils/types';
import Product from '../product/product.model';
import { StatusCodes } from 'http-status-codes';
import WishlistItem from './wishlist-item.model';
import AppError from '../../errors/AppError';

// add product in wishlist
const addProductToWishlist = async (
  payload: Pick<TWishlistItem, 'productId' | 'userId'>,
) => {
  console.log(payload);

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

  if (isProductAlreadyInWishlist) {
    throw new AppError(StatusCodes.CONFLICT, 'Product already in wishlist!');
  }

  const result = await WishlistItem.create({
    userId: payload.userId,
    productId: payload.productId,
  });

  return result;
};

const WishlistItemServices = {
  addProductToWishlist,
};
export default WishlistItemServices;
