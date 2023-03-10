import { usePokemon } from '../../../lib/client/react-query/pokemon/usePokemon';
import { usePokeSpecie } from '../../../lib/client/react-query/pokemon/usePokeSpecie';
import { PokemonDetails } from '../interfaces/Pokemon';
import { PokemonSpecie } from '../interfaces/PokemonSpecie';
import { PokemonMoveset } from './Movements';

export class Pokemon {
  general: PokemonDetails;
  constructor(public pokemonID: string) {
    this.general = usePokemon(pokemonID) as PokemonDetails;
  }

  getSpecie() {
    return usePokeSpecie(this.pokemonID) as PokemonSpecie;
  }

  /* getMoves() {
    new PokemonMoveset(this.general?.moves);
  } */

  getAbilities() {
    return this.general?.abilities;
  }

  getStats() {
    return this.general?.stats;
  }

  getTypes() {
    return this.general?.types;
  }

  getLocations() {
    return this.general?.location_area_encounters;
  }
}
