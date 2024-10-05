import catchAsync from '../../utils/catchAsync';
import WishlistItemServices from './wishlist-services';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

// add product to wishlist
const addProductToWishlist = catchAsync(async (req, res) => {
  const userId = req.user._id as string;
  const productId = req.body.productId;
  const result = await WishlistItemServices.addProductToWishlist({
    productId,
    userId,
  });
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Product added to wishlist successfully',
    data: result,
  });
});

// get all user's wishlist items
const getAllUserWishlistItems = catchAsync(async (req, res) => {
  // do
  const userId = req.params.userId;
  const wishlistItems = await WishlistItemServices.getAllUserWishlistItems(
    userId!,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Wishlist items retrieved successfully.',
    data: wishlistItems,
  });
});
const WishlistControllers = {
  addProductToWishlist,
  getAllUserWishlistItems,
};

export default WishlistControllers;
