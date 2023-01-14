import { AxiosError } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../axios';
import { GroupGenPokeDX } from '../../constants';

/* const getMapData = async () => {
  const response = await axiosInstance.get<GroupGenPokeDX>(
    'https://pokemon-wiki-api.pokemon-wiki.workers.dev/genverpkdx'
  );
  return response.data;
};

export const mapaData = () => {
  const query = useQuery<GroupGenPokeDX, AxiosError>(['mapaData'], () => getMapData());
  return query;
}; */

export const mapaDataCache = () => {
  const queryClient = useQueryClient();
  const query = queryClient.getQueryData<GroupGenPokeDX>(['mapaData']);
  return query;
};

/* Ç1 */
