import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchService from '../services/MatchService';

export default class MatchController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    const matches = await MatchService.getAll(inProgress as string | undefined);
    return res.status(StatusCodes.OK).json(matches);
  }
}
