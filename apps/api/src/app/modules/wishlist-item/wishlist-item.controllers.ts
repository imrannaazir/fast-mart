import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import WishlistItemServices from './wishlist-services';

// toggle product in wishlist
const toggleProductInWishlist = catchAsync(async (req, res) => {
  const userId = req.user._id as string;
  const productId = req.body.productId;
  const { result, message } =
    await WishlistItemServices.toggleProductInWishlist({
      productId,
      userId,
    });
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: message,
    data: result,
  });
});

// get all user's wishlist items
const getAllUserWishlistItems = catchAsync(async (req, res) => {
  // do
  const userId = req.user._id;
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
  toggleProductInWishlist,
  getAllUserWishlistItems,
};

export default WishlistControllers;
