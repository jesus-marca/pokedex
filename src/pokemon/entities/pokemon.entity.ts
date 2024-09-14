import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  //para nosql
  @Prop({
    unique: true,
    index: true,
  })
  no: string;

  @Prop({
    unique: true,
    index: true,
  })
  name: string;
}

//exportar el esquema ,le dice a la bd las definiciones que se van usar los ,los esquemas
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
