import { AuthTokenGuard } from '@modules/auth/guards';
import { UseGuards } from '@nestjs/common';

export const AuthGuard = (): <TFunction, Y>(
  target: (object | TFunction),
  propertyKey?: (string | symbol),
  descriptor?: TypedPropertyDescriptor<Y>,
) => void => UseGuards(AuthTokenGuard);
