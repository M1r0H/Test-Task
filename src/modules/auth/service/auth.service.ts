import { AuthHelper } from '@modules/auth/helpers';
import { User } from '@modules/users/entities';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  public async hashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(password, salt);
  }

  public getUser(): User | undefined {
    return AuthHelper.getUser();
  }

  public setUser(user: User): void {
    return AuthHelper.setUser(user);
  }

  public getPermissions(): string[] {
    return AuthHelper.getPermissions();
  }

  public setPermissions(permissions: string[]): void {
    return AuthHelper.setPermissions(permissions);
  }
}
