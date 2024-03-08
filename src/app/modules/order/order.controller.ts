import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import OrderService from './order.service';

// create order
const createOrder = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await OrderService.createOrder(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Order created successfully.',
    data: result,
  });
});

// get all orders
const getAllOrder = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await OrderService.getAllOrder(query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Orders retrieved successfully',
    data: result,
  });
});
const OrderController = {
  createOrder,
  getAllOrder,
};
export default OrderController;
