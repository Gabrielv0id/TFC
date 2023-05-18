import { StatusCodes } from 'http-status-codes';
import Crypt from '../utils/crypt';
import UserModel from '../database/models/UserModel';
import Login from '../interfaces/login';
import HttpError from '../utils/customError';
import Token from '../utils/Token';
import TokenDetails from '../interfaces/IToken';

export default class LoginService {
  constructor(private _token: TokenDetails = new Token()) {}

  async findOne({ email, password }: Login): Promise<string> {
    const user = await UserModel.findOne({ where: { email } }) as UserModel;
    LoginService._validateUser(user, password);

    const token = this._token.generate({ id: user.id, email });
    return token;
  }

  private static _validateUser(user: UserModel | null, password: string) {
    if (!user || !Crypt.compare(password, user.password)) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
    }
  }
}
