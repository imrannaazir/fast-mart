import { TCartItemInput } from '@repo/utils/types';
import catchAsync from '../../utils/catchAsync';
import CartItemServices from './cart-item.services';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

// add or remove product
const updateProductToCart = catchAsync(async (req, res) => {
  const payload: TCartItemInput = req.body;
  payload.userId = req.user._id!;
  const result = await CartItemServices.updateProductToCart(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: payload.type === 'add' ? 'Added to cart.' : 'Removed from cart.',
    data: result,
  });
});

// get all cart items of the user
const getAllMyCartItems = catchAsync(async (req, res) => {
  const userId = req?.user?._id;
  const result = await CartItemServices.getAllMyCartItems(userId!);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Cart items retrieved successfully.',
    data: result,
  });
});

const CartItemControllers = { updateProductToCart, getAllMyCartItems };
export default CartItemControllers;
