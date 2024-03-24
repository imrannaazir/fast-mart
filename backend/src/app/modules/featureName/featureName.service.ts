import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TFeatureName } from './featureName.interface';
import FeatureName from './featureName.model';

// create feature name
const createFeatureName = async (payload: TFeatureName) => {
  // check is already a FeatureName by provided name
  const isAlreadyFeatureNameByName = await FeatureName.findOne({
    name: payload.name,
  });
  if (isAlreadyFeatureNameByName) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'There is already a FeatureName by this name.',
    );
  }

  // create
  const result = await FeatureName.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Failed to create FeatureName.',
    );
  }

  return result;
};

// get all feature name
const getAllFeatureNames = async () => {
  const result = await FeatureName.find({});
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No feature names founded.');
  }

  return result;
};

const FeatureNameService = {
  createFeatureName,
  getAllFeatureNames,
};

export default FeatureNameService;
