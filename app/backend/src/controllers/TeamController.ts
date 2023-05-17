import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/TeamService';

export default class TeamController {
  public static async getAll(_req: Request, res: Response) {
    const teams = await TeamService.getAll();
    return res.status(StatusCodes.OK).json(teams);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamService.findById(Number(id));
    return res.status(StatusCodes.OK).json(team);
  }
}
