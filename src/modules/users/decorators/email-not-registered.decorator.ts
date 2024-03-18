import { UsersService } from '@modules/users/services';
import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint } from 'class-validator';
import { ContextResolveDecorator } from '@core/decorators';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailNotRegistered extends ContextResolveDecorator {
  public async process(email: string): Promise<boolean> {
    return this.moduleRef
      .get(UsersService, { strict: false })
      .one({ where: { email } })
      .then((user) => !user || user.id === this.request.params.id);
  }
}

export function EmailNotRegistered(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: { message: 'Email is already registered', ...validationOptions },
      constraints: [],
      validator: IsEmailNotRegistered,
    });
  };
}
