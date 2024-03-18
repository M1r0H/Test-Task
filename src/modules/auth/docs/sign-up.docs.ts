import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthRegisterBodyRequest } from '@modules/auth/requests';
import { AuthBadRequestResponse, AuthResponse } from '@modules/auth/response';

export const SignUpDocs = () => {
  return applyDecorators(
    ApiBody({ type: AuthRegisterBodyRequest }),
    ApiResponse({ status: HttpStatus.OK, type: AuthResponse }),
    ApiResponse({ status: HttpStatus.BAD_REQUEST, type: AuthBadRequestResponse }),
  );
};
