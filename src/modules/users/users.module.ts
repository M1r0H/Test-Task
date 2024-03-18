import { UsersController } from '@modules/users/controllers';
import { UsersSharedModule } from '@modules/users/users-shared.module';
import { Module } from '@nestjs/common';
import { IsEmailNotRegistered } from '@modules/users/decorators';
import { AuthSharedModule } from '@modules/auth/auth-shared.module';

@Module({
  imports: [
    AuthSharedModule,
    UsersSharedModule,
  ],
  controllers: [
    UsersController,
  ],
  providers: [
    // Decorators
    IsEmailNotRegistered,
  ],
  exports: [
    UsersSharedModule,
  ],
})
export class UsersModule {
}
