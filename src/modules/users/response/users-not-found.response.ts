import { ApiProperty } from '@nestjs/swagger';

export class UsersNotFoundResponse {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public message: string;
}
