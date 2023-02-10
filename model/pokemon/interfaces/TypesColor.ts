import { POKEMON_TYPE } from '../enums/PokemonType';

export type ColorsType = {
  [key in POKEMON_TYPE]: {
    base: string;
    light: string;
    dark: string;
  };
};
