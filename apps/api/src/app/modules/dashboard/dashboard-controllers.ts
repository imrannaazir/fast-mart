import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import DashboardServices from './dashboard.services';
const getDashboardInsights = catchAsync(async (req, res) => {
  const result = await DashboardServices.getDashboardInsights();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Dashboard insights retrieved successfully.',
    data: result,
  });
});
const getCustomerInsights = catchAsync(async (req, res) => {
  const result = await DashboardServices.getCustomerInsights();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Customer insights retrieved successfully.',
    data: result,
  });
});

const getRevenueInMonths = catchAsync(async (req, res) => {
  const result = await DashboardServices.getRevenueInMonths();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Revenue insights retrieved successfully.',
    data: result,
  });
});
const DashboardControllers = {
  getDashboardInsights,
  getCustomerInsights,
  getRevenueInMonths,
};
export default DashboardControllers;
