import { BaseGuard } from '@core/guards';
import { AuthToken } from '@modules/auth/auth.constants';
import { AuthService } from '@modules/auth/service';
import { TokensService } from '@modules/tokens/services';
import { HttpStatus, Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { Request } from 'express';

@Injectable()
export class AuthRefreshTokenGuard extends BaseGuard<{ token: string }> {
  public async process(): Promise<boolean> {
    const token = this.extractTokenFromCookie(this.request);

    if (!token) {
      this.error('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const tokenService = this.moduleRef.get(TokensService, { strict: false });

    const tokenFromDb = await tokenService.oneByToken({
      token,
      type: AuthToken.refresh,
      relations: ['user.role'],
    });

    const user = tokenFromDb?.user;

    if (!user) {
      this.error('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const authService = this.moduleRef.get(AuthService, { strict: false });

    authService.setUser(omit(user, ['role']));
    authService.setPermissions(user.role?.permissions ?? []);

    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const cookies = request.cookies['auth-token'];

    if (!cookies) {
      return;
    }

    const { refresh } = JSON.parse(cookies);

    return refresh;
  }
}
