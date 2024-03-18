import { User } from '@modules/users/entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AllParams, UserCreateParams, UserDeleteParams, UserEditParams, UserGetOneParams } from '@modules/users/types';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User)
    protected usersRepository: Repository<User>,
  ) {
  }

  public all(params: AllParams): Promise<User[]> {
    const query = this.usersRepository.createQueryBuilder('users');

    if (params?.page && params?.perPage) {
      query
        .take(params.perPage)
        .skip(params.page > 1 ? (params.page - 1) * params.perPage : 0);
    }

    return query.getMany();
  }

  public count(): Promise<number> {
    return this.usersRepository.count();
  }

  public one(params: UserGetOneParams): Promise<User> {
    const { where, relations = [], onlyPassword } = params;

    return this.usersRepository.findOne({
      where,
      relations,
      select: onlyPassword ? ['password'] : undefined,
    });
  }

  public create(params: UserCreateParams): Promise<User> {
    return this.usersRepository.save(params);
  }

  public async edit(params: UserEditParams): Promise<User> {
    const { id } = params;
    const previous = await this.usersRepository.findOne({ where: { id } });

    return this.usersRepository.save({
      ...previous,
      ...params,
    });
  }

  public async delete(params: UserDeleteParams): Promise<User> {
    const { id } = params;
    const user = await this.one({ where: params });

    await this.usersRepository.manager.transaction(async (entityManager) => {
      await entityManager.getRepository(User).delete(id);
    });

    return user;
  }
}
