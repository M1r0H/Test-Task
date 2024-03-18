import { BaseGuard } from '@core/guards';
import { RolesPermissionsService } from '@modules/roles/services';
import { CanGuardReflector } from '@modules/roles/types';
import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isArray } from 'lodash';

@Injectable()
export class CanGuard extends BaseGuard {
  public async process(context: ExecutionContext): Promise<boolean> {
    const { permissions, options } = this.reflector.get<CanGuardReflector>(
      'permissions',
      context.getHandler(),
    );
    const rolesPermissionsService = this.moduleRef.get(RolesPermissionsService, { strict: false });

    if (
      (isArray(permissions) && permissions.length || permissions) &&
      !rolesPermissionsService.can(permissions, options?.compare)
    ) {
      throw new HttpException(
        options?.message ?? 'Permission denied',
        options?.status ?? HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
