import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LearderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async getHomeTeamLeaderboard(_req: Request, res: Response) {
    const Leaderboard = await LearderboardService.getHomeTeamLeaderboard();

    return res.status(StatusCodes.OK).json(Leaderboard);
  }
}
