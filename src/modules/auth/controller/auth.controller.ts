import { AuthToken } from '@modules/auth/auth.constants';
import { AuthRefreshTokenGuard } from '@modules/auth/guards';
import { AuthLoginBodyRequest, AuthRegisterBodyRequest } from '@modules/auth/requests';
import { AuthService } from '@modules/auth/service';
import { GenerateToken } from '@modules/auth/types';
import { User } from '@modules/users/entities';
import { UsersService } from '@modules/users/services';
import { UserStatusType } from '@modules/users/users.constants';
import { Body, Controller, Get, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { TokensService } from '@modules/tokens/services';
import { RolesService } from '@modules/roles/services';
import { AvailableRoles } from '@modules/roles/roles.constants';
import { Token } from '@src/modules/tokens/entities';
import * as process from 'process';
import { TokensHelper } from '@modules/tokens/helpers';
import { Response } from 'express';
import { RefreshTokenDocs, SignInDocs, SignUpDocs } from '@modules/auth/docs';
import { AuthResponse } from '@modules/auth/response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    @Inject('CoreJwtService')
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly roleService: RolesService,
  ) {
  }

  @SignUpDocs()
  @Post('/registration')
  public async signUp(
    @Body() body: AuthRegisterBodyRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const password = await this.authService.hashedPassword(body.password);
    const role = await this.roleService.one({ where: { name: AvailableRoles.Viewer } });

    if (!body.roleId) {
      body.roleId = role.id;
    }

    const user = await this.usersService.create({
      ...body,
      password,
      roleId: body.roleId,
      status: UserStatusType.active,
    });

    const refreshToken = await this.createRefreshToken(user);
    const authToken = await this.createAuthToken(user);

    res.cookie('auth-token', JSON.stringify({
      token: authToken.token,
      userId: user.id,
      refresh: refreshToken?.token,
      permissions: user.role?.permissions ?? [],
    }));

    return {
      data: 'User created successfully!',
    };
  }

  @SignInDocs()
  @Post('/')
  public async signIn(
    @Body() { email }: AuthLoginBodyRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const user = await this.usersService.one({ where: { email }, relations: ['role'] });
    const refreshToken = await this.createRefreshToken(user);
    const authToken = await this.createAuthToken(user);

    res.cookie('auth-token', JSON.stringify({
      token: authToken.token,
      userId: user.id,
      refresh: refreshToken?.token,
      permissions: user.role?.permissions ?? [],
    }));

    return {
      data: 'User logged in successfully!',
    };
  }

  @RefreshTokenDocs()
  @UseGuards(AuthRefreshTokenGuard)
  @Get('refresh')
  public async refreshToken(
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const user = this.authService.getUser();
    const refreshToken = await this.createRefreshToken(user);
    const authToken = await this.createAuthToken(user);

    res.cookie('auth-token', JSON.stringify({
      token: authToken.token,
      userId: user.id,
      refresh: refreshToken?.token,
      permissions: user.role?.permissions ?? [],
    }));

    return {
      data: 'Token refreshed successfully!',
    };
  }

  private createAuthToken(user: User): Promise<Token> {
    return this.tokensService.create({
      token: this.getAuthTokenString({ user, expiry: +process.env.JWT_EXPIRY_TIME_HOURS }),
      userId: user.id,
      type: AuthToken.auth,
      expiry: TokensHelper.tokenExpire({ hours: +process.env.JWT_EXPIRY_TIME_HOURS }),
    });
  }

  private createRefreshToken(user: User): Promise<Token> {
    return this.tokensService.create({
      token: this.getAuthTokenString({ expiry: +process.env.JWT_REFRESH_EXPIRY_TIME_HOURS }),
      type: AuthToken.refresh,
      userId: user.id,
      expiry: TokensHelper.tokenExpire({ hours: +process.env.JWT_EXPIRY_TIME_HOURS }),
    });
  }

  private getAuthTokenString({ user, expiry }: GenerateToken): string {
    return this.jwtService.sign({
      username: user?.email,
      role: user?.role,
      id: user?.id,
      first_name: user?.firstName,
      expiry: TokensHelper.tokenExpire({ hours: expiry }).getTime(),
    });
  }
}
