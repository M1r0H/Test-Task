import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint } from 'class-validator';
import { ContextResolveDecorator } from '@core/decorators';
import bcrypt from 'bcrypt';
import { UsersService } from '@modules/users/services';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsValidPassword extends ContextResolveDecorator {
  public async process(password: string, data: ValidationArguments): Promise<boolean> {
    const { email } = data.object as { email: string };
    const userService = this.moduleRef.get(UsersService, { strict: false });
    const user = await userService.one({ where: { email }, onlyPassword: true });

    return user?.password ? await bcrypt.compare(password, user.password) : false;
  }
}

export function ValidPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: { message: 'Incorrect email or password', ...validationOptions },
      constraints: [],
      validator: IsValidPassword,
    });
  };
}
