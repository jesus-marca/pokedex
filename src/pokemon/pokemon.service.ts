import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    //es neceario el injectModel y Pokemon.name
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto = {
        ...createPokemonDto,
        name: createPokemonDto.name.toLowerCase(),
      };
      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (!isNaN(+term)) {
      // pokemon.save()
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }
    //MongoId
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    //name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term });
    }

    if (!pokemon)
      throw new NotFoundException(`pokemon doesn't existe with no ${term}`);
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    let pokemon = await this.findOne(term);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    try {
      //aqui el update cambia la base de datos mas no el valor de pokemon en si,por eso se utiliza el spread operator para mostrar
      await pokemon.updateOne(updatePokemonDto, { new: true });

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    // let pokemon = await this.findOne(term);
    // if (!pokemon) throw new BadRequestException(`doesn't exists pokemon`);
    // await pokemon.deleteOne()
    // await this.pokemonModel.deleteOne({ no: pokemon.no });
    // return `this pokemon was deleted`;
    // const result = await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount, acknowledged } = await this.pokemonModel.deleteOne({
      _id: id,
    });
    if (deletedCount === 0) throw new BadRequestException(`pokemon with id: ${id }not found`);
    // return { id };
    return ;
  }
  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `pokemon no or name duplicated ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `can't update pokemon -check server logs`,
    );
  }
}
