import { UserNotRegistered, ValidPassword } from '@modules/auth/decorators';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginBodyRequest {
  @ApiProperty()
  @IsEmail({}, { message: 'Email must be a valid email' })
  @IsNotEmpty({ message: 'Email is required' })
  @UserNotRegistered()
  public readonly email: string;

  @ApiProperty()
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @ValidPassword()
  public readonly password: string;
}
