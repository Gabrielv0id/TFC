import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import loginSchema from '../joi/schemas';

export default (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    const { type } = error.details[0];
    if (type.includes('required') || type.includes('empty')) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
  }

  next();
};
