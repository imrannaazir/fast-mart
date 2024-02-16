import catchAsync from '../../utils/catchAsync';

// create user
const createUser = catchAsync(async (req, res) => {
  console.log('hello world');
});

const UserController = {
  createUser,
};
export default UserController;
