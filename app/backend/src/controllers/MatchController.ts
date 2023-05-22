import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchService from '../services/MatchService';

export default class MatchController {
  static async getAll(_req: Request, res: Response) {
    const matches = await MatchService.getAll();
    return res.status(StatusCodes.OK).json(matches);
  }
}
