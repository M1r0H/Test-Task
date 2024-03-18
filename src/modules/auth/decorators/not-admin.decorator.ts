import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint } from 'class-validator';
import { ContextResolveDecorator } from '@core/decorators';
import { RolesService } from '@modules/roles/services';
import { AvailableRoles } from '@modules/roles/roles.constants';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsNotAdmin extends ContextResolveDecorator {
  public async process(roleId: string): Promise<boolean> {
    const roleService = this.moduleRef.get(RolesService, { strict: false });
    const role = await roleService.one({ where: { id: roleId } });

    return role.name !== AvailableRoles.Admin;
  }
}

export function NotAdmin(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: { message: 'You cannot register as an admin', ...validationOptions },
      constraints: [],
      validator: IsNotAdmin,
    });
  };
}
