import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleExist } from '@modules/roles/decorators';

export class UsersEditBodyRequest {
  @ApiProperty()
  @IsString({ message: 'Users role ID must be a string' })
  @IsNotEmpty({ message: 'Users role ID is required' })
  @RoleExist()
  public readonly roleId: string;
}
