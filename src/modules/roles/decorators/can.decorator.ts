import { CanDecoratorReturnType, CanOptions } from '@modules/roles/types';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { CanGuard } from '@modules/roles/guards';

export const Can = (permissions: string | string[], options?: CanOptions): CanDecoratorReturnType =>
  applyDecorators(
    SetMetadata('permissions', {
      permissions,
      options,
    }),
    UseGuards(CanGuard),
  );
