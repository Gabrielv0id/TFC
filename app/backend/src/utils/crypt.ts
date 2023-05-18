import * as bcrypt from 'bcryptjs';

export default class Crypt {
  static compare(password: string, hash: string): boolean {
    const result = bcrypt.compareSync(password, hash);
    return result;
  }

  static encrypt(password: string): string {
    const result = bcrypt.hashSync(password);
    return result;
  }
}
