import { AxiosError } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../axios';
import { PokemonDetails } from '../../../../types/models/Pokemon';

/* const getPokemon = async (id: string) => {
  console.log('Fetching ' + id);
  const response = await axiosInstance.get<PokemonDetails>(
    `http://pokeapi.co/api/v2/pokemon/${id}`
  );
  return response.data;
};
 */
export const usePokemon = (id: string) => {
  const queryclient = useQueryClient();
  const query = queryclient.getQueryData<PokemonDetails>(['pokemonDetails', id]);
  return query;
};
