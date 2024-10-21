import catchAsync from '../../utils/catchAsync';
import WishlistItemServices from './wishlist-services';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

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
  toggleProductInWishlist,
  getAllUserWishlistItems,
};

export default WishlistControllers;
