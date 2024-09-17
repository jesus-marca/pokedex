import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from 'src/pokemon/entities/pokemon.entity';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),

    CommonModule,
    PokemonModule,
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
