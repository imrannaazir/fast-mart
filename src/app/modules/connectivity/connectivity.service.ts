import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import PowerSource from './connectivity.model';
import { TConnectivity } from './connectivity.interface';
import Connectivity from './connectivity.model';

// create connectivity
const createConnectivity = async (payload: TConnectivity) => {
  // check is already a PowerSource by provided name
  const isAlreadyConnectivityByName = await PowerSource.findOne({
    name: payload.name,
  });
  if (isAlreadyConnectivityByName) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'There is already a Connectivity by this name.',
    );
  }

  // create
  const result = await Connectivity.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Failed to create Connectivity.',
    );
  }

  return result;
};

// get all connectivity
const getAllConnectivity = async () => {
  const result = await Connectivity.find({});
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No connectivity founded.');
  }
  return result;
};

const ConnectivityService = {
  createConnectivity,
  getAllConnectivity,
};

export default ConnectivityService;
