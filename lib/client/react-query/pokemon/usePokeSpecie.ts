import { AxiosError } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../axios';
import { PokemonSpecie } from '../../../../types/models/PokemonSpecie';

/* const getSpecie = async (id: string) => {
  const response = await axiosInstance.get<PokemonSpecie>(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  return response.data;
}; */

export const usePokeSpecie = (id: string) => {
  const queryClient = useQueryClient();
  const query = queryClient.getQueryData<PokemonSpecie>(['pokemonSpecie', id]);
  return query;
};
