import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TPowerSource } from './powerSource.interface';
import PowerSource from './powerSource.model';

const createPowerSource = async (payload: TPowerSource) => {
  // check is already a PowerSource by provided name
  const isAlreadyPowerSourceByName = await PowerSource.findOne({
    name: payload.name,
  });
  if (isAlreadyPowerSourceByName) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'There is already a Power Source by this name.',
    );
  }

  // create
  const result = await PowerSource.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Failed to create Power Source.',
    );
  }

  return result;
};

const getAllPowerSource = async () => {
  const result = await PowerSource.find({});
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Power source not founded.');
  }

  return result;
};

const PowerSourceService = {
  createPowerSource,
  getAllPowerSource,
};

export default PowerSourceService;
