import * as jwt from 'jsonwebtoken';

export type TokenJwtPayload = {
  id: number,
  email: string,
};

export default class Token {
  private _secret = process.env.JWT_SECRET || 'secret';

  generate(data: object) {
    const token = jwt.sign(data, this._secret, { expiresIn: '7d' });
    return token;
  }

  validate(token: string) {
    const data = jwt.verify(token, this._secret);

    return data as TokenJwtPayload;
  }
}
