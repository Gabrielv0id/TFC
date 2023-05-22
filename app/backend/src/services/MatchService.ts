import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

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
}
