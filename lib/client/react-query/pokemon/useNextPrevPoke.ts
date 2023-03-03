import { useQueries } from '@tanstack/react-query';
import axiosInstance from '../axios';
import { PokemonDetails } from '../../../../types/models/Pokemon';

const getPokemon = async (poke: string) => {
  const response = await axiosInstance.get<PokemonDetails>(
    `http://pokeapi.co/api/v2/pokemon/${poke}`
  );
  return response.data;
};

export const nextPrevPoke = (id: number) => {
  const MAX_POKE = 905;
  let arrPoke: string[] = [];
  let NEXT_POKE: number | string = 0;
  let PREV_POKE: number | string = 0;

  if (id > 1) {
    PREV_POKE = id - 1;
    PREV_POKE = String(PREV_POKE);
    arrPoke.push(PREV_POKE);
  }
  if (id < MAX_POKE) {
    NEXT_POKE = id + 1;
    NEXT_POKE = String(NEXT_POKE);
    arrPoke.push(NEXT_POKE);
  }

  const pokeQueries = useQueries({
    queries: arrPoke.map((poke) => {
      return {
        queryKey: ['pokemonDetails', poke],
        queryFn: () => getPokemon(poke),
        enabled: poke === '<no source>' ? false : true,
      };
    }),
  });

  let pokesData: { [key: string]: any } = {};

  pokeQueries.map((e) => {
    if (pokeQueries.length == 2) {
      if (pokesData['next'] == null) {
        pokesData['prev'] = e.data;
      }
      pokesData['next'] = e.data;
    } else {
      if (id == 1) {
        pokesData['next'] = e.data;
      }
      if (id == MAX_POKE) {
        pokesData['prev'] = e.data;
      }
    }
  });

  /*   let newObject = pokeQueries.reduce(function (obj, value) {
    let key = value.;
    if (obj[key] != null) obj[key] = [];

    obj[key].push(value);
    return obj;
  }, {}); */

  return { pokesData };
};
