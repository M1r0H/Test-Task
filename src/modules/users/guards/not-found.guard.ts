import { UsersService } from '@modules/users/services';
import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseGuard } from '@core/guards';

@Injectable()
export class UsersNotFoundGuard extends BaseGuard<{ id: string; userId: string }> {
  public async process(): Promise<boolean> {
    const id: string | undefined = this.request?.params?.id;

    if (!id) {
      this.error('Invalid user id', HttpStatus.BAD_REQUEST);
    }

    const uuidv4Regex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-4[0-9a-fA-F]{3}\b-[89abAB][0-9a-fA-F]{3}\b-[0-9a-fA-F]{12}$/;

    if (!uuidv4Regex.test(id)) {
      this.error('Invalid UUID', HttpStatus.BAD_REQUEST);
    }

    const usersService = this.moduleRef.get(UsersService, { strict: false });
    const user = await usersService.one({ where: { id } });

    if (!user) {
      this.error('Users not found', HttpStatus.NOT_FOUND);
    }

    return true;
  }
}
