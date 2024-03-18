import { UserStatusType } from '@modules/users/users.constants';
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '@modules/users/services';
import { ModuleRef } from '@nestjs/core';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserNotRegistered implements ValidatorConstraintInterface {
  public constructor(
    protected readonly moduleRef: ModuleRef,
  ) {
  }

  public async validate(email: string): Promise<boolean> {
    return this.moduleRef
      .get(UsersService, { strict: false })
      .one({
        where: { email, status: UserStatusType.active },
      })
      .then((user) => !!user);
  }
}

export function UserNotRegistered(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: { message: 'Incorrect email or password', ...validationOptions },
      constraints: [],
      validator: IsUserNotRegistered,
    });
  };
}
