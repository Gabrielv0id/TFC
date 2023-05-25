import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../utils/customError';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    throw new HttpError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      'It is not possible to create a match with two equal teams',
    );
  }

  next();
};
