import { AxiosError } from 'axios';
import { useQueries, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axiosInstance from '../axios';
import { PokemonDetails } from '../../../../types/models/Pokemon';

const getPokemon = async (id: string) => {
  console.log('Fetching Severals ' + id);
  const response = await axiosInstance.get<PokemonDetails>(
    `http://pokeapi.co/api/v2/pokemon/${id}`
  );

  return response.data;
};

export const useSeveralPokemon = (id: string[]) => {
  let results: PokemonDetails[] = [];

  const query = useQueries({
    queries: id.map((el) => {
      return {
        queryKey: ['pokemonDetails', el],
        queryFn: () => getPokemon(el),
      };
    }),
  });

  query.map((item) => {
    if (item.data === undefined) return;
    results.push(item.data);
  });

  return results;
};
