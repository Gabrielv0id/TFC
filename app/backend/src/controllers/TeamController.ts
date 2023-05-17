import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/TeamService';

export default class TeamController {
  public static async getAll(_req: Request, res: Response) {
    const teams = await TeamService.getAll();
    return res.status(StatusCodes.OK).json(teams);
  }
}
