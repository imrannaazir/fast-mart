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

const getMyOrders = catchAsync(async (req, res) => {
  const userId = req?.user?._id;

  const response = await OrderServices.getMyOrders(userId!);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Your Orders retrieved successfully',
    data: response,
  });
});

const getMyOrderById = catchAsync(async (req, res) => {
  const userId = req?.user?._id;
  const orderId = req.params.orderId;
  const response = await OrderServices.getMyOrderById(orderId!, userId!);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order retrieved successfully',
    data: response,
  });
});

const getAllAdminOrders = catchAsync(async (req, res) => {
  const orderId = req.params.orderId;

  const response = await OrderServices.getAllAdminOrders(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Orders retrieved successfully',
    data: response,
  });
});

const getAdminOrderById = catchAsync(async (req, res) => {
  const orderId = req.params.orderId;

  const response = await OrderServices.getAdminOrderById(orderId!);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Order retrieved successfully',
    data: response,
  });
});

const OrderControllers = {
  placeOrder,
  getMyOrders,
  getMyOrderById,
  getAllAdminOrders,
  getAdminOrderById,
};
export default OrderControllers;
