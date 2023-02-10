import { POKEMON_TYPE } from '../enums/PokemonType';

export type TypesDamages = {
  [key in POKEMON_TYPE]: {
    [key in POKEMON_TYPE]: number;
  };
};
