import { TPlaceOrderInput } from '@repo/utils/types';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import OrderServices from './order.service';

const placeOrder = catchAsync(async (req, res) => {
  const body = req.body as TPlaceOrderInput;
  const userId = req?.user?._id;

  const response = await OrderServices.placeOrder(body, userId!);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Order placed successfully',
    data: response,
  });
});

const OrderControllers = { placeOrder };
export default OrderControllers;
