import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import validateTokenMiddleware from '../Middlewares/validateToken.middleware';
import matchesMiddleware from '../Middlewares/matches.middleware';

const matchRouter = Router();

matchRouter.get('/', (req, res) => MatchController.getAll(req, res));

matchRouter.post(
  '/',
  validateTokenMiddleware,
  matchesMiddleware,
  (req, res) => MatchController.createMatch(req, res),
);

matchRouter.patch(
  '/:id/finish',
  validateTokenMiddleware,
  (req, res) => MatchController.finishMatch(req, res),
);

matchRouter.patch(
  '/:id',
  validateTokenMiddleware,
  (req, res) => MatchController.updateMatch(req, res),
);

export default matchRouter;
