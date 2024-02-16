import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  /* 
    1. handle zod error
    2. handle mongoose validation error
    3. handle duplicate key error
    4. handle cast error
    5. handle error that instance of AppError
    */

  let statusCode = 5000;
  let message = 'Internal server error.';
  let errorSources = null;
  let errorType = '';
  console.log(error);
};

export default globalErrorHandler;
