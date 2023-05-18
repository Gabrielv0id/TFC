import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import loginMiddleware from '../Middlewares/login.middleware';

const loginRouter = Router();

const loginControler = new LoginController();

loginRouter.post('/', loginMiddleware, (req, res) => loginControler.login(req, res));

export default loginRouter;
