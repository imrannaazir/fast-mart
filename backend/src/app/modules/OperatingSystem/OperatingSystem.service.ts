import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TOperatingSystem } from './operatingSystem.interface';
import OperatingSystem from './operatingSystem.model';

// create Operating system
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

// get all Operating system
const getAllOperatingSystem = async () => {
  const result = OperatingSystem.find({});
  if (!result) {
    throw new AppError(StatusCodes.OK, 'Operating system not founded.');
  }

  return result;
};

const OperatingSystemService = {
  createOperatingSystem,
  getAllOperatingSystem,
};

export default OperatingSystemService;
