import { tokenExpireType } from '@modules/tokens/types';

export class TokensHelper {
  public static tokenExpire({ hours }: tokenExpireType): Date {
    return new Date(new Date().getTime() + 60 * 60 * hours * 1000);
  }
}
