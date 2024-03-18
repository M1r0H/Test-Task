import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  UsersBadRequestResponse,
  UsersNotFoundResponse,
  UsersPermissionDeniedResponse,
  UsersResponse,
} from '@modules/users/response';
import { UsersEditBodyRequest } from '@modules/users/requests';

export const UsersEditDocs = () => {
  return applyDecorators(
    ApiParam({ name: 'id', type: String }),
    ApiBody({ type: UsersEditBodyRequest }),
    ApiResponse({ status: HttpStatus.OK, type: UsersResponse }),
    ApiResponse({ status: HttpStatus.FORBIDDEN, type: UsersPermissionDeniedResponse }),
    ApiResponse({ status: HttpStatus.BAD_REQUEST, type: UsersBadRequestResponse }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, type: UsersNotFoundResponse }),
  );
};
