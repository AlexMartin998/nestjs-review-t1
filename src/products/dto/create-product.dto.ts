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
  title: string;

  @IsString()
  @MinLength(10)
  @IsOptional()
  sku?: string;

  @IsBoolean()
  @IsOptional()
  hasStock?: boolean;

  @IsNumber()
  @IsPositive()
  @Type(() => Number) // intenta convertir el valor a un número (util dtos anidados)
  price: number;
}
