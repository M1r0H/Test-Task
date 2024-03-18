import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthLoginBodyRequest } from '@modules/auth/requests';
import { AuthBadRequestResponse, AuthResponse } from '@modules/auth/response';

export const SignInDocs = () => {
  return applyDecorators(
    ApiBody({ type: AuthLoginBodyRequest }),
    ApiResponse({ status: HttpStatus.OK, type: AuthResponse }),
    ApiResponse({ status: HttpStatus.BAD_REQUEST, type: AuthBadRequestResponse }),
  );
};
