import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { JwtPayload } from 'jsonwebtoken';
import { verifyPassword, generateToken, decodeToken } from './auth.utils';
import config from '../../config';
import { TLoginUser, TUser } from '@repo/utils/types';

// register user
const register = async (payload: TUser) => {
  const { email } = payload;

  // check if already user exist by email
  const isAlreadyUserExistByEmail = await User.findOne({ email });
  if (isAlreadyUserExistByEmail) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'There is already a user by this email.',
    );
  }
  const user = await User.create(payload);

  const JwtPayload: JwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to register.');
  }

  // generate access token
  const accessToken = await generateToken(
    JwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  // generate refresh token
  const refreshToken = await generateToken(
    JwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_token_expires_in as string,
  );
  return { user, accessToken, refreshToken };
};

// login user
const login = async (payload: TLoginUser) => {
  const { email, password } = payload;

  // check if user is exit
  const isUserExist = await User.findOne({ email }).select('+password');

  if (!isUserExist) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User not registered.');
  }

  // decoded password and check
  const isMatched = await verifyPassword(password, isUserExist.password);

  if (!isMatched) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'Your provided password is incorrect.',
    );
  }

  const JwtPayload: JwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  // generate access token
  const accessToken = await generateToken(
    JwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  // generate refresh token
  const refreshToken = await generateToken(
    JwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_token_expires_in as string,
  );
  return { accessToken, refreshToken };
};

// refresh token
const refreshToken = async (token: string) => {
  // if refresh token not sent
  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Token is not available.');
  }

  const decoded = (await decodeToken(
    token,
    config.jwt_refresh_secret as string,
  )) as JwtPayload;

  if (!decoded) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Token is not valid.');
  }

  const isUserExist = await User.findOne({ email: decoded.email });

  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Account not found.');
  }

  const JwtPayload: JwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  // generate access token
  const accessToken = await generateToken(
    JwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  //generate refresh token
  const refreshToken = await generateToken(
    JwtPayload,
    config.jwt_refresh_secret!,
    config.jwt_refresh_token_expires_in!,
  );

  return { accessToken, refreshToken };
};

const AuthService = {
  register,
  login,
  refreshToken,
};
export default AuthService;
