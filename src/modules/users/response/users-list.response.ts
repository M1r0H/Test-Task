import { ApiProperty } from '@nestjs/swagger';
import { UsersResponse } from '@modules/users/response/users.response';

export class UsersListResponse {
  @ApiProperty({ type: [UsersResponse] })
  public readonly data: UsersResponse[];

  @ApiProperty()
  public total: number;
}
