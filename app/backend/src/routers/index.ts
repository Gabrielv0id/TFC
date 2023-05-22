import { Router } from 'express';
import teamRouter from './teamRouter';
import loginRouter from './loginRouter';
import matchRouter from './matchRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);

export default router;
