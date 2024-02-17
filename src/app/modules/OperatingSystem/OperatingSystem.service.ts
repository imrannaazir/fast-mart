import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TOperatingSystem } from './OperatingSystem.interface';
import OperatingSystem from './OperatingSystem.model';

const createOperatingSystem = async (payload: TOperatingSystem) => {
  // check is already a operating system by provided name
  const isAlreadyOperatingSystemByName = await OperatingSystem.findOne({
    name: payload.name,
  });
  if (isAlreadyOperatingSystemByName) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'There is already a operating system by this name.',
    );
  }

  // create
  const result = await OperatingSystem.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Failed to create operating system.',
    );
  }

  return result;
};

const OperatingSystemService = {
  createOperatingSystem,
};

export default OperatingSystemService;
