import StatusCodes from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import UserServices from './user.service';
const updateUserDetails = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const payload = req.body;
  const result = await UserServices.updateUserDetails(payload, userId!);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Your profile has been updated successfully!',
    data: result,
  });
});

const UserControllers = { updateUserDetails };
export default UserControllers;
