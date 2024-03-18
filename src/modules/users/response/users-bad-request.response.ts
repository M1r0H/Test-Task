import { ApiProperty } from '@nestjs/swagger';

export class UsersBadRequestResponse {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public message: string;

  @ApiProperty()
  public fields: Record<string, string[]>;
}
