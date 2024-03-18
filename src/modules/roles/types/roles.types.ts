import { FindOptionsWhere } from 'typeorm';
import { Role } from '@modules/roles/entities';

export interface RolesCreateParams {
  name: string;
  permissions: string[];
}

export interface RolesGetOneParams {
  where: FindOptionsWhere<Role> | FindOptionsWhere<Role>[];
}
