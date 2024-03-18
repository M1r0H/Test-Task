import { ApiProperty } from '@nestjs/swagger';

export class AuthUnathorizedResponse {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public message: string;
}
