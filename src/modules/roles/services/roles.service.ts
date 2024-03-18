import { Role } from '@modules/roles/entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesCreateParams, RolesGetOneParams } from '@modules/roles/types';

@Injectable()
export class RolesService {
  @InjectRepository(Role)
  protected rolesRepository: Repository<Role>;

  public async all(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  public async count(): Promise<number> {
    return this.rolesRepository.count();
  }

  public async one(params: RolesGetOneParams): Promise<Role> {
    const { where } = params;

    return this.rolesRepository.findOne({ where });
  }

  public async create(params: RolesCreateParams): Promise<Role> {
    return await this.rolesRepository.save(params);
  }
}
