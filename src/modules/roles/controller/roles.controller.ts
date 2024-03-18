import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesService } from '@modules/roles/services';
import { reduce } from 'lodash';
import { RolesGetAllDocs } from '@modules/roles/docs';
import { RolesResponse } from '@modules/roles/response';
import { AvailableRoles } from '@modules/roles/roles.constants';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  public constructor(
    private readonly roleService: RolesService,
  ) {
  }

  @RolesGetAllDocs()
  @Get()
  public async index(): Promise<RolesResponse> {
    const roles = await this.roleService.all();
    const prepareRoles = reduce(roles, (acc, role) => {
      if (role.name === AvailableRoles.Admin) {
        return acc;
      }

      return { ...acc, [role.name]: role.id };
    }, {});

    return {
      data: prepareRoles,
    };
  }
}
