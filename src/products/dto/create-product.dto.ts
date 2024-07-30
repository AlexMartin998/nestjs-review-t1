import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3, { message: 'Description must be at least 10 characters long' })
  name: string;

  @IsString()
  @MinLength(10)
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number) // intenta convertir el valor a un número (util dtos anidados)
  price: number;
}
