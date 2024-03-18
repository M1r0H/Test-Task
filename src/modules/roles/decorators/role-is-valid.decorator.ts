import { ContextResolveDecorator } from '@core/decorators';
import { RolesService } from '@modules/roles/services';
import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint } from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsRoleExist extends ContextResolveDecorator {
  public async process(roleId: string): Promise<boolean> {
    return this.moduleRef
      .get(RolesService, { strict: false })
      .one({ where: { id: roleId } })
      .then((role) => !!role);
  }
}

export function RoleExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: { message: 'Role not found', ...validationOptions },
      validator: IsRoleExist,
    });
  };
}
