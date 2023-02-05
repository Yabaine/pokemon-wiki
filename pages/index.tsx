import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FC } from 'react';
import PageLayout from '../layouts/PageLayout/PageLayout';
import axiosInstance from '../lib/client/react-query/axios';
import { TypeGroupGenPokeDX } from '../types/models/GroupGenPokeDX';
import { PokemonType } from '../types/models/Pokemon';
import HomeView from '../views/Home/Home';
import { dehydrate, QueryClient } from '@tanstack/react-query';

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
    const response = await axiosInstance.get<TypeGroupGenPokeDX>(
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
