import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  no: number;

  @IsString()
  @MinLength(3)
  name: string;
}
