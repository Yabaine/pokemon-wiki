import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axios';
import { PokemonType } from '../../../../types/models/Pokemon';

const getPokemon = async () => {
  const response = await axiosInstance.get<PokemonType>(
    `http://pokeapi.co/api/v2/pokemon/?limit=10000`
  );
  return response.data;
};

export const useAllPokemon = () => {
  const query = useQuery<PokemonType, AxiosError>(['allPokemon'], () => getPokemon());
  return query;
};
