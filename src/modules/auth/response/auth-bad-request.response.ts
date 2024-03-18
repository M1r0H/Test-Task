import { ApiProperty } from '@nestjs/swagger';

export class AuthBadRequestResponse {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public message: string;

  @ApiProperty()
  public fields: Record<string, string[]>;
}
