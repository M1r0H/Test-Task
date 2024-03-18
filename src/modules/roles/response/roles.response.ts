import { ApiProperty } from '@nestjs/swagger';

export class RolesResponse {
  @ApiProperty()
  public readonly data: Record<string, string>;
}
