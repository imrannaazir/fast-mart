import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import FeatureNameService from './featureName.service';

// create Tag
const createFeatureName = catchAsync(async (req, res) => {
  const result = await FeatureNameService.createFeatureName(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'FeatureName created successfully.',
    data: result,
  });
});

const FeatureNameController = {
  createFeatureName,
};

export default FeatureNameController;
