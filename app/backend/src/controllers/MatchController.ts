import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchService from '../services/MatchService';
import UpdateMatchDetails from '../interfaces/IUpdateMatch';

export default class MatchController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    const matches = await MatchService.getAll(inProgress as string | undefined);
    return res.status(StatusCodes.OK).json(matches);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    await MatchService.finishMatch(Number(id));

    return res.status(StatusCodes.OK).json({ message: 'Finished' });
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await MatchService.updateById(
      { id: Number(id), homeTeamGoals, awayTeamGoals } as UpdateMatchDetails,
    );

    return res.status(StatusCodes.OK).json({ message: 'Match updated!' });
  }

  static async createMatch(req: Request, res: Response) {
    const createdMatch = await MatchService.createMatch(req.body);

    return res.status(StatusCodes.CREATED).json(createdMatch);
  }
}
