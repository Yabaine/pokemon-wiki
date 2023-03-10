import axios, { AxiosError } from 'axios';
import { useQueries, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axiosInstance from '../axios';
import { PokemonDetails } from '../../../../types/models/Pokemon';
import { MovementDetails } from '../../../../types/models/PokemonMovement';

const URL = 'https://pokeapi.co/api/v2/move/';

const getMovementDetails = async (id: string) => {
  /* console.log('Fetching Severals ' + id); */

  const response = await fetch(`${URL}${id}`);
  return response.json() as Promise<MovementDetails>;
};

export const useMoveInfinityDetails = (size: number = 20, ids: string[]) => {
  const query = useQueries({
    queries: ids.slice(0, size).map((id) => {
      return {
        queryKey: ['movementDetails', id],
        queryFn: () => getMovementDetails(id),
      };
    }),
  });

  const isLoading = query.some((item) => item.status !== 'success');

  return { query, isLoading };
};
