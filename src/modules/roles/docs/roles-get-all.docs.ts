import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { RolesResponse } from '@modules/roles/response';

export const RolesGetAllDocs = () => {
  return applyDecorators(
    ApiResponse({ status: HttpStatus.OK, type: RolesResponse }),
  );
};
