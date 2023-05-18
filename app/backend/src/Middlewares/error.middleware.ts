import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import HttpError from '../utils/customError';

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpError) {
    const { statusCode, message } = err;
    res.status(statusCode || 500).json({ message });
  }

  if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default errorMiddleware;
