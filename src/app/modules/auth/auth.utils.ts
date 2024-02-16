import bcrypt from 'bcrypt';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
// hash password
export const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, Number(config.salt_rounds));
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to hash password.',
    );
  }
};

// generate token
export const generateToken = async (
  payload: JwtPayload,
  secret: string,
  expiresIn: string,
) => {
  try {
    return jwt.sign(payload, secret, { expiresIn });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to generate token.',
    );
  }
};
