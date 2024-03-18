import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty()
  public readonly data: string;
}
