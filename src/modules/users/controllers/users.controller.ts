import { User } from '@modules/users/entities';
import { UsersNotFoundGuard } from '@modules/users/guards';
import { UsersEditBodyRequest, UsersListQueryRequest } from '@modules/users/requests';
import { UsersService } from '@modules/users/services';
import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@modules/auth/decorators';
import { AuthService } from '@modules/auth/service';
import { Can } from '@modules/roles/decorators';
import { AvailablePermissions, Compare } from '@modules/roles/roles.constants';
import { UsersListResponse } from '@modules/users/response';
import { UsersDeleteDocs, UsersEditDocs, UsersGetAllDocs, UsersGetOneDocs } from '@modules/users/docs';

@ApiTags('Users')
@ApiCookieAuth('auth-token')
@AuthGuard()
@Controller('users')
export class UsersController {
  public constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {
  }

  @UsersGetAllDocs()
  @Can(AvailablePermissions.UsersRead)
  @Get()
  public async index(@Query() query: UsersListQueryRequest): Promise<UsersListResponse> {
    const {
      page,
      perPage,
    } = query;

    const users = await this.usersService.all({
      page: page || 1,
      perPage: perPage,
    });

    return { data: users, total: users.length };
  }

  @UsersGetOneDocs()
  @Can(AvailablePermissions.UsersRead)
  @UseGuards(UsersNotFoundGuard)
  @Get(':id')
  public async view(@Param('id') id: string): Promise<User> {
    return this.usersService.one({ where: { id } });
  }

  @UsersEditDocs()
  @Can([AvailablePermissions.SelfEdit])
  @UseGuards(UsersNotFoundGuard)
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() body: UsersEditBodyRequest,
  ): Promise<User> {
    return this.usersService.edit(
      {
        id,
        ...body,
      },
    );
  }

  @UsersDeleteDocs()
  @Can(
    [
      AvailablePermissions.UsersDelete,
      AvailablePermissions.SelfDelete,
    ],
    {
      compare: Compare.some,
    },
  )
  @UseGuards(UsersNotFoundGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<User> {
    const user = this.authService.getUser();

    if (user.id !== id) {
      throw new Error('You can delete only your account');
    }

    return this.usersService.delete({ id });
  }
}
