import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../utils/customError';
import Token from '../utils/Token';
import AuthenticatedRequest from '../interfaces/AuthenticatedRequest';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) throw new HttpError(StatusCodes.UNAUTHORIZED, 'Token not found');

  const token = new Token();
  const { email, id } = token.validate(authorization);
  (req as AuthenticatedRequest).user = {
    id,
    email,
  };
  next();
};
