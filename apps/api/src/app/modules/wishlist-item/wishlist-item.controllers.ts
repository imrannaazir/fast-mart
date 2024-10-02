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

const WishlistControllers = {
  addProductToWishlist,
};

export default WishlistControllers;
