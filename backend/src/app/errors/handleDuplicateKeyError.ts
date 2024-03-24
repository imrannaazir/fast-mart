/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleDuplicateKeyError = (error: any): TGenericErrorResponse => {
  const statusCode = StatusCodes.CONFLICT;
  const path = Object.keys(error.keyValue)[0];
  const message = `Duplicate Key error at path '${path}'`;
  const errorSources: TErrorSource[] = [
    {
      path: `${path}`,
      message: `${error.keyValue[path]} is already exist at '${path}`,
    },
  ];
  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleDuplicateKeyError;
