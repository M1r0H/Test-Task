import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthUnathorizedResponse } from '@modules/auth/response';

export const RefreshTokenDocs = () => {
  return applyDecorators(
    ApiResponse({ status: HttpStatus.OK }),
    ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: AuthUnathorizedResponse }),
  );
};
