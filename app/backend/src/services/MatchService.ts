import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import UpdateMatchDetails from '../interfaces/IUpdateMatch';
import CreateMatchDetails from '../interfaces/ICreateMatch';
import TeamService from './TeamService';

export default class MatchService {
  static async getAll(inProgress: string | undefined): Promise<Match[]> {
    if (inProgress === undefined) {
      const matches = await Match.findAll({
        include: [
          { model: Team, as: 'homeTeam', attributes: ['teamName'] },
          { model: Team, as: 'awayTeam', attributes: ['teamName'] },
        ],
      });
      return matches;
    }
    const matches = await Match.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  static async finishMatch(id: number) {
    await Match.update({ inProgress: false }, { where: { id } });
  }

  static async updateById({ id, homeTeamGoals, awayTeamGoals }: UpdateMatchDetails) {
    await Match.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });
  }

  static async createMatch(createMatchParams: CreateMatchDetails) {
    await TeamService.findById(createMatchParams.homeTeamId);
    await TeamService.findById(createMatchParams.awayTeamId);

    const createdMatch = await Match.create({
      homeTeamId: createMatchParams.homeTeamId,
      awayTeamId: createMatchParams.awayTeamId,
      homeTeamGoals: createMatchParams.homeTeamGoals,
      awayTeamGoals: createMatchParams.awayTeamGoals,
      inProgress: true,
    });

    return createdMatch;
  }
}
