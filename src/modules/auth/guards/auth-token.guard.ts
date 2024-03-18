import { BaseGuard } from '@core/guards';
import { AuthToken } from '@modules/auth/auth.constants';
import { AuthService } from '@modules/auth/service';
import { RolesPermissionsService } from '@modules/roles/services';
import { TokensService } from '@modules/tokens/services';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { omit } from 'lodash';

@Injectable()
export class AuthTokenGuard extends BaseGuard {
  public async process(): Promise<boolean> {
    const authToken = this.extractTokenFromCookie(this.request);

    if (!authToken) {
      this.error();
    }

    const permissionsService = this.moduleRef.get(RolesPermissionsService, { strict: false });
    const authService = this.moduleRef.get(AuthService, { strict: false });
    const tokensService = this.moduleRef.get(TokensService, { strict: false });
    const dbToken = await tokensService.oneByToken({
      token: authToken,
      type: AuthToken.auth,
      relations: ['user.role'],
    });

    if (!dbToken) {
      this.error();
    }

    const user = dbToken.user;

    if (!user) {
      this.error();
    }

    permissionsService.createAbility(
      user.role?.permissions?.map((name) => name.trim()) ?? [],
    );

    authService.setUser(omit(user, ['role']));
    authService.setPermissions(user?.role?.permissions ?? []);

    return true;
  }

  protected error(): never {
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const cookies = request.cookies['auth-token'];

    if (!cookies) {
      return;
    }

    const { token } = JSON.parse(cookies);

    return token;
  }
}
