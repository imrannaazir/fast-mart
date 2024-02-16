import { Response } from 'express';
type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const { message, statusCode, success } = data;
  res.status(statusCode).json({
    success,
    message,
    data: data.data,
  });
};

export default sendResponse;
