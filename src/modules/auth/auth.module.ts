import { AuthSharedModule } from '@modules/auth/auth-shared.module';
import { AuthController } from '@modules/auth/controller';
import { IsUserNotRegistered, IsValidPassword } from '@modules/auth/decorators';
import { UsersSharedModule } from '@modules/users/users-shared.module';
import { Global, Module } from '@nestjs/common';
import { RolesSharedModule } from '@modules/roles/roles-shared.module';
import { TokensSharedModule } from '@modules/tokens/tokens-shared.module';
import { CoreJwtModule } from '@core/jwt.module';
import { IsNotAdmin } from '@modules/auth/decorators/not-admin.decorator';

@Global()
@Module({
  imports: [
    AuthSharedModule,
    UsersSharedModule,
    RolesSharedModule,
    TokensSharedModule,
    CoreJwtModule,
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    // Decorators
    IsNotAdmin,
    IsValidPassword,
    IsUserNotRegistered,
  ],
})
export class AuthModule {
}
