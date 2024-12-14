import { UserStatus } from '@repo/utils/constants';
import { TLoginUser, TUser } from '@repo/utils/types';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import sendEmail from '../../utils/send-mail';
import User from '../user/user.model';
import {
  decodeToken,
  generateToken,
  hashPassword,
  verifyPassword,
} from './auth.utils';

// register user
const register = async (payload: TUser) => {
  let user = await User.findOne({
    email: payload?.email,
  });

  if (user?._id && user?.status === 'ACTIVE') {
    throw new AppError(StatusCodes.NOT_FOUND, 'User Is Already Registered');
  }

  if (user?._id && user?.status === 'BLOCKED') {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'Your account has been blocked!',
    );
  }

  const hashedPassword = await hashPassword(payload.password);

  payload.password = hashedPassword;

  if (!user?._id && user?.status !== 'PENDING') {
    user = await User.create(payload);
  }

  if (!user) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed To Register User',
    );
  }

  const jwtPayload: JwtPayload = {
    email: user.email,
    _id: user._id,
    role: user.role,
  };

  const verifyToken = await generateToken(
    jwtPayload,
    config.jwt_verify_secret as string,
    config.jwt_verify_token_expires_in as string,
  );

  const verifyAccountLink = `${user?.role === 'USER' ? config.origin_url_2 : config.origin_url_1}/verify?token=${verifyToken}&email=${user?.email}`;
  const emailHtml = `
        <div>
        <p>Dear ${user.email}</p>
        <p>Your account verification link:</p>
        <a href=${verifyAccountLink}>
        <button>Click here to Verify Account</button>
        </a>
        </div>
    `;
  sendEmail({
    receiver: user?.email,
    html: emailHtml,
    subject: 'Verify account.',
  });

  return null;
};

// verify account
const verifyAccount = async (token: string) => {
  const isTokenValid = decodeToken(
    token,
    config.jwt_verify_secret!,
  ) as JwtPayload;

  if (!isTokenValid) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid token.');
  }

  const user = await User.findById(isTokenValid?._id);
  console.log({ user });

  if (user?.status === 'BLOCKED') {
    throw new AppError(StatusCodes.FORBIDDEN, 'Your account is blocked.');
  }

  await User.updateOne(
    { _id: isTokenValid?._id },
    {
      status: UserStatus.ACTIVE,
    },
  );
};

const resentVerificationEmail = async (email: string) => {
  const isUserRegistered = await User.findOne({
    email,
  });

  if (!isUserRegistered) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User is not registered.');
  }

  if (isUserRegistered.status === 'BLOCKED') {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User is blocked.');
  }

  if (isUserRegistered.status === 'ACTIVE') {
    throw new AppError(
      StatusCodes.CONFLICT,

      'User is already verified.',
    );
  }

  const jwtPayload: JwtPayload = {
    email: isUserRegistered.email,
    _id: isUserRegistered._id,
    role: isUserRegistered.role,
  };

  const verifyToken = await generateToken(
    jwtPayload,
    config.jwt_verify_secret as string,
    config.jwt_verify_token_expires_in as string,
  );

  const verifyAccountLink = `${isUserRegistered?.role === 'USER' ? config.origin_url_2 : config?.origin_url_1}/verify?token=${verifyToken}&email=${isUserRegistered?.email}`;
  const emailHtml = `
        <div>
        <p>Dear ${isUserRegistered.email}</p>
        <p>Your account verification link:</p>
        <a href=${verifyAccountLink}>
        <button>Click here to Verify Account</button>
        </a>
        </div>
    `;
  sendEmail({
    receiver: isUserRegistered?.email,
    html: emailHtml,
    subject: 'Verify account.',
  });

  return null;
};

// login user
const login = async (payload: TLoginUser) => {
  const { email, password } = payload;

  // check if user is exit
  const isUserExist = await User.findOne({ email }).select('+password');

  if (!isUserExist) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User not registered.');
  }

  if (isUserExist?.status === 'PENDING') {
    throw new AppError(
      StatusCodes?.UNAUTHORIZED,
      'Your account is not verified, Check your mail!',
    );
  }

  if (isUserExist?.status === 'BLOCKED') {
    throw new AppError(
      StatusCodes?.UNAUTHORIZED,
      'Your account has been blocked!',
    );
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
    _id: isUserExist._id,
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
    _id: isUserExist._id,
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
  verifyAccount,
  resentVerificationEmail,
};
export default AuthService;
