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

export const useMoveDetails = (ids: string[]) => {
  let movesDetails: MovementDetails[] = [];

  const query = useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: ['movementDetails', id],
        queryFn: () => getMovementDetails(id),
        keepPreviousData: true,
      };
    }),
  });

  query.map((item) => {
    // Ñ2
    /*     console.log('data', item); */
    if (item.status === 'loading') return;
    if (item.status === 'success') {
      movesDetails.push(item.data);
    }
  });

  return movesDetails;
};
