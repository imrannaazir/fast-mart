import mongoose from 'mongoose';
import colors from 'colors';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';
import { StatusCodes } from 'http-status-codes';

const handleMongooseError = (
  error: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const message = error.message;
  const statusCode = StatusCodes.BAD_REQUEST;
  const errorSources: TErrorSource[] = Object.values(error.errors).map(
    issue => ({
      message: issue.message,
      path: issue.path,
    }),
  );

  console.log(colors.red(errorSources));

  return {
    message,
    statusCode,
    errorSources,
  };
};
export default handleMongooseError;
