import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import OperatingSystemService from './OperatingSystem.service';

// create OperatingSystem
const createOperatingSystem = catchAsync(async (req, res) => {
  const result = await OperatingSystemService.createOperatingSystem(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Operating System created successfully.',
    data: result,
  });
});

const OperatingSystemController = {
  createOperatingSystem,
};

export default OperatingSystemController;
