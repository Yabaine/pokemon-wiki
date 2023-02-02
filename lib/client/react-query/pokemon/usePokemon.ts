import { AxiosError } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../axios';
import { PokemonDetails } from '../../../../types/models/Pokemon';

const getPokemon = async (id: string) => {
  console.log('Fetching 1 ' + id);
  const response = await axiosInstance.get<PokemonDetails>(
    `http://pokeapi.co/api/v2/pokemon/${id}`
  );
  return response.data;
};

export const usePokemon = (id: string) => {
  const query = useQuery<PokemonDetails>(['pokemonDetails', id], () => getPokemon(id));

  return query.data;
};
