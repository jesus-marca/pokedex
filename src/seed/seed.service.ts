import { Injectable } from '@nestjs/common';
// import { AxiosInstance } from 'axios';
// import axios from 'axios';
import { PokeRes } from './interfaces/poke-response.interface';
// import { PokemonService } from 'src/pokemon/pokemon.service';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  // private readonly axios: AxiosInstance = axios;
  constructor(
    //opcion con pokemon model
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private http: AxiosAdapter,
    //opcion con pokemon service
    // private readonly pokemonsService: PokemonService,
  ) {}
  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const  data  = await this.http.get<PokeRes>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    //primera forma de hacer multiples insercions,acumular las promesas

    // const insertPormisesArray = [];

    //segunda forma juntando todos los objetos en un arreglo

    const pokemonItems: { no: number; name: string }[] = [];
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      //esto es con el pokemon model
      // const pokemon=await this.pokemonModel.create({ no, name });

      //esto es con el pokemon service,con los 2 se podia
      // this.pokemonsService.create({ name, no });

      // insertPormisesArray.push(this.pokemonModel.create({ no, name }));
      pokemonItems.push({ no, name });
    });
    //aqui se ejecuta el arreglo de promesa
    // const newArray = await Promise.all(insertPormisesArray);
    //esto es mas eficiente
    this.pokemonModel.insertMany(pokemonItems);
    return data.results;
  }
}
