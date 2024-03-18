import { ApiProperty } from '@nestjs/swagger';

export class UsersPermissionDeniedResponse {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public message: string;
}
