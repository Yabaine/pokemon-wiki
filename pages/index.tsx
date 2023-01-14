import Head from 'next/head';
import PageLayout from '../layouts/PageLayout/PageLayout';
import React, { FC } from 'react';
import axiosInstance from '../lib/client/react-query/axios';
import { GetStaticProps } from 'next';
import HomeView from '../views/Home/Home';
import { PokemonType } from '../types/models/Pokemon';
import { GroupGenPokeDX } from '../lib/client/constants';

import {
  useQuery,
  useMutation,
  useQueryClient,
  dehydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const Home: FC = () => {
  return (
    <PageLayout>
      <Head>
        <title>PokemonApi</title>
      </Head>
      <HomeView></HomeView>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  async function getMons() {
    const res = await axiosInstance.get<PokemonType>(
      'http://pokeapi.co/api/v2/pokemon/?limit=10000'
    );
    return res.data;
  }
  async function getMapData() {
    const response = await axiosInstance.get<GroupGenPokeDX>(
      `http://127.0.0.1:8787/genverpkdx`
      /* 'https://pokemon-wiki-api.pokemon-wiki.workers.dev/genverpkdx' */
    );
    return response.data;
  }

  await Promise.all([
    queryClient.prefetchQuery(['allPokemon'], () => getMons()),
    /* queryClient.prefetchQuery(['mapaData'], () => getMapData()), */
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
