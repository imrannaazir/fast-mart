import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AuthService from './auth.service';
import config from '../../config';

// register
const register = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, user } = await AuthService.register(
    req.body,
  );

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'development' ? true : false,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully.',
    data: { accessToken, user },
  });
});

const AuthController = {
  register,
};

export default AuthController;
