import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ConnectivityService from './connectivity.service';

// create Connectivity
const createConnectivity = catchAsync(async (req, res) => {
  const result = await ConnectivityService.createConnectivity(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Connectivity created successfully.',
    data: result,
  });
});

// get all connectivity
const getAllConnectivity = catchAsync(async (req, res) => {
  const result = await ConnectivityService.getAllConnectivity();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Connectivity retrieved successfully.',
    data: result,
  });
});
const ConnectivityController = {
  createConnectivity,
  getAllConnectivity,
};

export default ConnectivityController;
