import { literal, col, fn } from 'sequelize';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import TeamStats from '../interfaces/ITeamStats';

const victory = 'COUNT(CASE WHEN `home_team_goals` > `away_team_goals` THEN 1 END)';
const draw = 'COUNT(CASE WHEN `home_team_goals` = `away_team_goals` THEN 1 END)';
const lose = 'COUNT(CASE WHEN `home_team_goals` < `away_team_goals` THEN 1 END)';

export default class LearderboardService {
  static teamStatsFormated(teamStats: any) : TeamStats {
    return {
      name: teamStats.name,
      totalPoints: teamStats.totalVictories * 3 + teamStats.totalDraws,
      totalGames: teamStats.totalVictories + teamStats.totalDraws + teamStats.totalLosses,
      totalVictories: teamStats.totalVictories,
      totalDraws: teamStats.totalDraws,
      totalLosses: teamStats.totalLosses,
      goalsFavor: Number(teamStats.goalsFavor),
      goalsOwn: Number(teamStats.goalsOwn),
      goalsBalance: Number(teamStats.goalsFavor) - Number(teamStats.goalsOwn),
      efficiency: +Number(
        ((teamStats.totalVictories * 3 + teamStats.totalDraws)
          / ((teamStats.totalVictories + teamStats.totalDraws + teamStats.totalLosses) * 3)) * 100,
      ).toFixed(2),
    };
  }

  static sortTeamLeaderboard(teamStats: TeamStats[]): TeamStats[] {
    const sortedLeaderboard = teamStats.sort((teamA, teamB) => {
      if (teamA.totalPoints !== teamB.totalPoints) {
        return teamB.totalPoints - teamA.totalPoints;
      }
      if (teamA.goalsBalance !== teamB.goalsBalance) {
        return teamB.goalsBalance - teamA.goalsBalance;
      }
      if (teamA.goalsFavor !== teamB.goalsFavor) {
        return teamB.goalsFavor - teamA.goalsFavor;
      }
      return teamA.name.localeCompare(teamB.name);
    });

    return sortedLeaderboard;
  }

  static async getHomeTeamLeaderboard(): Promise<TeamStats[]> {
    const teamStats = await Match.findAll({
      where: { inProgress: false },
      include: [{ model: Team, as: 'homeTeam', attributes: ['team_name'] }],
      attributes: [
        [col('homeTeam.team_name'), 'name'],
        [literal(victory), 'totalVictories'],
        [literal(draw), 'totalDraws'],
        [literal(lose), 'totalLosses'],
        [fn('SUM', col('home_team_goals')), 'goalsFavor'],
        [fn('SUM', col('away_team_goals')), 'goalsOwn'],
      ],
      group: ['homeTeam.id'],
      raw: true,
    });

    console.log(teamStats);
    const teamStatsFormatted = teamStats.map(LearderboardService.teamStatsFormated);
    const sortedLeaderboard = LearderboardService.sortTeamLeaderboard(teamStatsFormatted);

    return sortedLeaderboard;
  }
}
