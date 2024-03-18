import { UserStatusType } from '@modules/users/users.constants';
import { FindOptionsWhere } from 'typeorm';
import { User } from '@modules/users/entities';

export interface AllParams {
  page?: number;
  perPage?: number;
}

export interface UserCreateParams {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  roleId: string;
  status: UserStatusType;
}

export interface UserEditParams {
  id: string;
  roleId: string;
}

export interface UserGetOneParams {
  where: FindOptionsWhere<User> | FindOptionsWhere<User>[];
  relations?: string[];
  onlyPassword?: boolean;
}

export interface UserDeleteParams {
  id: string;
}
