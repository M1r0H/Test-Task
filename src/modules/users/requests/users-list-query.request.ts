import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UsersListQueryRequest {
  @IsNumber({}, { message: 'users.dto.listQuery.pageIsNumber' })
  @IsPositive({ message: 'users.dto.listQuery.pageIsPositive' })
  @IsOptional()
  @Transform(({ obj, key }) => Number(obj[key]))
  public readonly page?: number;

  @IsNumber({}, { message: 'users.dto.listQuery.perPageIsNumber' })
  @IsOptional()
  @IsPositive({ message: 'users.dto.listQuery.perPageIsPositive' })
  @Transform(({ obj, key }) => Number(obj[key]))
  public readonly perPage?: number;
}
