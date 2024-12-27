import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const modelName = error.message.match(/model\s"(\w+)"/)?.[1];

  const statusCode = StatusCodes.BAD_REQUEST;
  const message = `Invalid ${modelName} id.`;

  const errorSources: TErrorSource[] = [
    {
      path: error.value,
      message: `${modelName} not found by id.`,
    },
  ];
  return {
    message,
    statusCode,
    errorSources,
  };
};

export default handleCastError;
