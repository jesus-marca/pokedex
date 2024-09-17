import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from '../../pokemon/dto/create-pokemon.dto';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  
  limit?: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  offset?: number;
}
