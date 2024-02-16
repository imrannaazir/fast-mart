import { Application, Request, Response } from 'express';

const notFoundHandler = (req: Request, res: Response, next: Application) => {
  return res.status();
};

export default notFoundHandler;
