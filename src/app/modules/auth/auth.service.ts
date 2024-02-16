import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import User from '../user/user.model';
import { JwtPayload } from 'jsonwebtoken';
import { generateToken } from './auth.utils';
import config from '../../config';

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

// create user

const AuthService = {
  register,
};
export default AuthService;
