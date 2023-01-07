import PageLayout from '../../layouts/PageLayout';
import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { nextPrevPoke } from '../../lib/client/react-query/pokemon/useNextPrevPoke';
import PokeView from '../../views/Pokemon';
import Head from 'next/head';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { usePokeSpecie } from '../../lib/client/react-query/pokemon/usePokeSpecie';
import { usePokemon } from '../../lib/client/react-query/pokemon/usePokemon';
import { PokemonDetails } from '../../types/models/Pokemon';
import { PokemonSpecie } from '../../types/models/PokemonSpecie';
import axiosInstance from '../../lib/client/react-query/axios';

type Props = {
  title: string | string[] | undefined;
};

const Pokemon: FC<Props> = ({ title }) => {
  return (
    <PageLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <PokeView></PokeView>
    </PageLayout>
  );
};

export async function getStaticPaths() {
  /* type Results = {
    query: {
      data?: {
        count?: string;
        next?: string | null;
        prev?: string | null;
        results?: any;
      };
    };
  };

  const getPokemon = async () => {
    const response = await axiosInstance.get<PokemonType>(
      `http://pokeapi.co/api/v2/pokemon/?limit=10000`
    );
    return response.data;
  };
  
  const query = useQuery<PokemonType, AxiosError>(['allPokemon'], () => getPokemon(), {
    staleTime: 1000 ** 100,
  }); */

  let arrItems = [];

  for (let i = 1; i < 20; i++) {
    arrItems.push({ params: { id: `${i}` } });
  }

  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const queryClient = new QueryClient();
  const id = params?.id as string;

  /* await queryClient.prefetchQuery(['pokemonDetails', id], () => usePokemon(id)); */

  const getPokemon = async (id: string) => {
    console.log('Fetching ' + id);
    const response = await axiosInstance.get<PokemonDetails>(
      `http://pokeapi.co/api/v2/pokemon/${id}`
    );
    return response.data;
  };

  const getSpecie = async (id: string) => {
    const response = await axiosInstance.get<PokemonSpecie>(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    return response.data;
  };

  await Promise.all([
    queryClient.prefetchQuery(['pokemonDetails', id], () => getPokemon(id)),
    queryClient.prefetchQuery(['pokemonSpecie', id], () => getSpecie(id)),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      title: id,
    },
  };
};

export default Pokemon;
