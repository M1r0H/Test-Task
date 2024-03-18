import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  UsersBadRequestResponse,
  UsersNotFoundResponse,
  UsersPermissionDeniedResponse,
  UsersResponse,
} from '@modules/users/response';

export const UsersDeleteDocs = () => {
  return applyDecorators(
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: HttpStatus.OK, type: UsersResponse }),
    ApiResponse({ status: HttpStatus.FORBIDDEN, type: UsersPermissionDeniedResponse }),
    ApiResponse({ status: HttpStatus.BAD_REQUEST, type: UsersBadRequestResponse }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, type: UsersNotFoundResponse }),
  );
};
