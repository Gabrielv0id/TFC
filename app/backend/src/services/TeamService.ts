import { StatusCodes } from 'http-status-codes';
import HttpError from '../utils/customError';
import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  public static async getAll(): Promise<TeamModel[]> {
    const teams = await TeamModel.findAll();
    return teams;
  }

  static async findById(id: number): Promise<TeamModel> {
    const team = await TeamModel.findByPk(id);

    if (!team) throw new HttpError(StatusCodes.NOT_FOUND, 'There is no team with such id!');

    return team;
  }
}
