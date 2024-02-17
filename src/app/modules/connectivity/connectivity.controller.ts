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

const ConnectivityController = {
  createConnectivity,
};

export default ConnectivityController;
