import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import User from './user.model';

// create user
const createUser = catchAsync(async (req, res) => {
  throw new AppError(StatusCodes.BAD_GATEWAY, 'Bad request.');

  const user = await User.find({});
});

const UserController = {
  createUser,
};
export default UserController;
