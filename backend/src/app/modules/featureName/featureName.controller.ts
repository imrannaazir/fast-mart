import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import FeatureNameService from './featureName.service';

// create feature name
const createFeatureName = catchAsync(async (req, res) => {
  const result = await FeatureNameService.createFeatureName(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'FeatureName created successfully.',
    data: result,
  });
});

// get all feature names
const getAllFeatureNames = catchAsync(async (req, res) => {
  const result = await FeatureNameService.getAllFeatureNames();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Features names retrieved successfully.',
    data: result,
  });
});

const FeatureNameController = {
  createFeatureName,
  getAllFeatureNames,
};

export default FeatureNameController;
