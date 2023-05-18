import { TokenJwtPayload } from '../utils/Token';

export default interface TokenDetails {
  generate(data: object): string,
  validate(token: string): TokenJwtPayload
}
