import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3, { message: 'Description must be at least 10 characters long' })
  @ApiProperty({
    description: 'Product title',
    minLength: 3,
  })
  title: string;

  @IsString()
  @MinLength(10)
  @IsOptional()
  @ApiProperty({
    description: 'Product title (unique)',
    nullable: true,
    minLength: 10,
    uniqueItems: true,
  })
  sku?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Product availability',
    nullable: true,
  })
  hasStock?: boolean;

  @IsNumber()
  @IsPositive()
  @Type(() => Number) // intenta convertir el valor a un número (util dtos anidados)
  @ApiProperty({
    description: 'Product price',
    minimum: 0,
    type: Number,
  })
  price: number;
}
