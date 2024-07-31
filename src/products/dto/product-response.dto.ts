import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ProductDtoDocsRes {
  @ApiProperty({
    required: false,
    description: 'Product uuid',
    type: String,
  })
  @IsOptional()
  @Type(() => String)
  id: string;

  @ApiProperty({
    required: false,
    description: 'Product title',
    minLength: 3,
  })
  @IsOptional()
  @Type(() => String)
  title?: string;

  @ApiProperty({
    required: false,
    description: 'Product title (unique)',
    nullable: true,
    minLength: 10,
    uniqueItems: true,
  })
  @IsOptional()
  @Type(() => String)
  sku?: string;

  @ApiProperty({
    required: false,
    description: 'Product availability',
    nullable: true,
  })
  @IsOptional() // no Type xq es boolean y siempre es true
  hasStock?: boolean;

  @ApiProperty({
    required: false,
    description: 'Product price',
    minimum: 0,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  price: number;
}
