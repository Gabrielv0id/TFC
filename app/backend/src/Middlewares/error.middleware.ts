import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/customError';

// const errorMiddleware = (err: unknown, req: Request, res: Response, _next: NextFunction) => {

const errorMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  // const statusCode = err.statusCode || 500;
  // const message = err.message || 'Internal Server Error';
  // res.status(statusCode).send({ statusCode, message });
  const { statusCode, message } = err as HttpError;
  res.status(statusCode || 500).json({ message });
};

export default errorMiddleware;
