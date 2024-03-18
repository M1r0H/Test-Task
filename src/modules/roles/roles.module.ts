import { RolesSharedModule } from '@modules/roles/roles-shared.module';
import { Module } from '@nestjs/common';
import { IsRoleExist } from '@modules/roles/decorators';
import { RolesController } from '@modules/roles/controller';

@Module({
  imports: [
    RolesSharedModule,
  ],
  controllers: [RolesController],
  providers: [
    //   Decorators
    IsRoleExist,
  ],
  exports: [
    RolesSharedModule,
  ],
})
export class RolesModule {
}
