import { RolesPermissionsService, RolesService } from '@modules/roles/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@modules/roles/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
  ],
  providers: [
    RolesService,
    RolesPermissionsService,
  ],
  exports: [
    RolesService,
    RolesPermissionsService,
  ],
})
export class RolesSharedModule {
}
