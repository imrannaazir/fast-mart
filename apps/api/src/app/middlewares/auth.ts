import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { decodeToken } from '../modules/auth/auth.utils';
import config from '../config';
import { JwtPayload } from 'jsonwebtoken';
import User from '../modules/user/user.model';
import { TRole } from '@repo/utils/types';

const auth = (...requiredRole: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // token
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Your are not authenticated.',
      );
    }

    const decoded = (await decodeToken(
      token as string,
      config.jwt_access_secret as string,
    )) as JwtPayload;

    if (!decodeToken) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You are not authenticated.',
      );
    }

    // is user exist
    const isUserExist = await User.findOne({ email: decoded.email });

    if (!isUserExist) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Account not founded.');
    }

    if (requiredRole.length > 0 && !requiredRole.includes(decoded.role)) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Access denied.');
    }

    // set user in req
    req.user = isUserExist;
    next();
  });
};

export default auth;
