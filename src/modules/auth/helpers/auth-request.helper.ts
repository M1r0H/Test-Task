import { User } from '@modules/users/entities';
import { ContextHelper } from '@core/helpers';

export class AuthHelper {
  public static getUser(): User | undefined {
    return ContextHelper.get('modules.auth.user');
  }

  public static setUser(user: User): void {
    return ContextHelper.set('modules.auth.user', user);
  }

  public static getPermissions(): string[] {
    return ContextHelper.get('modules.auth.permissions') ?? [];
  }

  public static setPermissions(permissions: string[]): void {
    return ContextHelper.set('modules.auth.permissions', permissions);
  }
}
