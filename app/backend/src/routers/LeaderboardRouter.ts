import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req, res) => LeaderboardController.getHomeTeamLeaderboard(req, res),
);

export default leaderboardRouter;
