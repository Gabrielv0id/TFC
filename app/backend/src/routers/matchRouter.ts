import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchRouter = Router();

matchRouter.get('/', (req, res) => MatchController.getAll(req, res));

export default matchRouter;
