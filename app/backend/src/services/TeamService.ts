import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  public static async getAll(): Promise<TeamModel[]> {
    const teams = await TeamModel.findAll();
    return teams;
  }
}
