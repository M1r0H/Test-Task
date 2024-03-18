import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserStatusType } from '@modules/users/users.constants';

export class UsersResponse {
  @ApiProperty()
  public readonly id: string;

  @ApiPropertyOptional()
  public firstName?: string;

  @ApiPropertyOptional()
  public lastName?: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public roleId: string;

  @ApiProperty()
  public status: UserStatusType;

  @ApiProperty()
  public readonly createdAt: Date;

  @ApiPropertyOptional()
  public readonly updatedAt?: Date;

  @ApiPropertyOptional()
  public readonly deletedAt?: Date;
}
