import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

import { PAGINATION } from '../utils';

export class PaginationDto {
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  limit?: number = PAGINATION.limit;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number = PAGINATION.offset;
}
