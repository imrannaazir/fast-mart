import { Response } from 'express';

export type TMeta = {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
};

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: TMeta;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const { message, statusCode, success } = data;
  res.status(statusCode).json({
    success,
    message,
    data: data.data,
    meta: data?.meta,
  });
};

export default sendResponse;
