import { InferSubjects, PureAbility } from '@casl/ability';
import { User } from '@modules/users/entities';
import { Compare } from '@modules/roles/roles.constants';

export type AppAbility = PureAbility<[string, Subjects]>;

export type Subjects = InferSubjects<typeof User> | 'all';

export type CanOptions = { message?: string; status?: number; compare: Compare };

export type CanGuardReflector = {
  permissions: string | string[];
  options: CanOptions;
};

export type CanDecoratorReturnType = <TFunction extends typeof Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void;
