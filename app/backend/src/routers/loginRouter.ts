import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import loginMiddleware from '../Middlewares/login.middleware';
import validateTokenMiddleware from '../Middlewares/validateToken.middleware';

const loginRouter = Router();

const loginControler = new LoginController();

loginRouter.post('/', loginMiddleware, (req, res) => loginControler.login(req, res));
loginRouter.get('/role', validateTokenMiddleware, (req, res) => LoginController.findRole(req, res));

export default loginRouter;
