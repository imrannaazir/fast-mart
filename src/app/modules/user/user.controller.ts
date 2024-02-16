import catchAsync from '../../utils/catchAsync';
import User from './user.model';

// create user
const createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  console.log(user);
});

const UserController = {
  createUser,
};
export default UserController;
