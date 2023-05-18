import { Router } from 'express';
import teamRouter from './teamRouter';
import loginRouter from './loginRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);

export default router;
