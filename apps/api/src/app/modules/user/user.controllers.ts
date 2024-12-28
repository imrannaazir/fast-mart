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

const getMyData = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const result = await UserServices.getMyData(userId!);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Your profile data has been retrieved!',
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All user retrieved successfully.',
    data: result?.data,
    meta: result?.meta,
  });
});

const UserControllers = { updateUserDetails, getMyData, getAllUser };
export default UserControllers;
