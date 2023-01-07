import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axios';
import { PokemonSpecie } from '../../../../types/models/PokemonSpecie';

const getSpecie = async (id: string) => {
  const response = await axiosInstance.get<PokemonSpecie>(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  return response.data;
};

export const usePokeSpecie = (id: string) => {
  const query = useQuery<PokemonSpecie, AxiosError>(
    ['pokemonSpecie', id],
    () => getSpecie(id),
    { retry: 1 }
  );
  return query;
};
