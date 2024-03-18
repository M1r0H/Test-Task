import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UsersListResponse, UsersPermissionDeniedResponse } from '@modules/users/response';
import { UsersListQueryRequest } from '@modules/users/requests';

export const UsersGetAllDocs = () => {
  return applyDecorators(
    ApiQuery({ name: 'query', type: UsersListQueryRequest }),
    ApiResponse({ status: HttpStatus.OK, type: UsersListResponse }),
    ApiResponse({ status: HttpStatus.FORBIDDEN, type: UsersPermissionDeniedResponse }),
  );
};
