import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import config from '../config';
import colors from 'colors';
import handleMongooseError from '../errors/handleMongooseError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  /* 
    1. handle zod error
    2. handle mongoose validation error
    3. handle duplicate key error
    4. handle cast error
    5. handle error that instance of AppError
    */
  const success = false;
  let statusCode = 500;
  let message = 'Internal server error.';
  let errorSources = null;

  // handle zod error
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  // handle mongoose validation error
  if (error.name === 'ValidationError') {
    const simplifiedError = handleMongooseError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  }

  // send response
  res.status(statusCode).json({
    success,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
