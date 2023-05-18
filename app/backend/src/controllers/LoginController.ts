import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private _loginService = new LoginService()) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await this._loginService.findOne({ email, password });
    return res.status(StatusCodes.OK).json({ token });
  }
}
