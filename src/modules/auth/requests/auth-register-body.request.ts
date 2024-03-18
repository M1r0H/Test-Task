import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { EmailNotRegistered } from '@modules/users/decorators';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotAdmin } from '@modules/auth/decorators/not-admin.decorator';
import { RoleExist } from '@modules/roles/decorators';

export class AuthRegisterBodyRequest {
  @ApiProperty()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @EmailNotRegistered()
  public readonly email: string;

  @ApiProperty()
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(3, 190, { message: 'Password must be between 3 and 190 characters long' })
  public readonly password: string;

  @ApiPropertyOptional()
  @IsString({ message: 'Role must be a string' })
  @IsOptional()
  @NotAdmin()
  @RoleExist()
  public roleId?: string;
}
