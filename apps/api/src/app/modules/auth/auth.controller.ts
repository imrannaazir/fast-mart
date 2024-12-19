import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AuthService from './auth.service';

// register
const register = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Check your email to verify account.',
    data: result,
  });
});

const resentVerificationEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = AuthService.resentVerificationEmail(email);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Verification link resent successfully.',
    data: result,
  });
});

const verifyAccount = catchAsync(async (req, res) => {
  const { token } = req.body;
  await AuthService.verifyAccount(token);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Account Verified successfully.',
    data: null,
  });
});

// login
const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await AuthService.login(req.body);

  // set cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'development' ? true : false,
  });
  res.cookie('accessToken', accessToken, {
    secure: config.NODE_ENV === 'development' ? true : false,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User logged in successfully.',
    data: { accessToken, refreshToken },
  });
});

const logout = catchAsync(async (req, res) => {
  res.cookie('refreshToken', null, {
    secure: config.NODE_ENV === 'development' ? true : false,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User logged out successfully.',
    data: null,
  });
});

// refresh token
const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies.refreshToken || req.headers.token;

  const result = await AuthService.refreshToken(token);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'AccessToken retrieved successfully.',
    data: result,
  });
});

// change password
const changePassword = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const payload = req.body;
  const result = await AuthService.changePassword(payload, userId!);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Your password has been updated!',
    data: result,
  });
});
const AuthController = {
  register,
  resentVerificationEmail,
  verifyAccount,
  login,
  refreshToken,
  logout,
  changePassword,
};

export default AuthController;
