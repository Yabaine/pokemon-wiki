import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FC } from 'react';
import PageLayout from '../../layouts/PageLayout';
import axiosInstance from '../../lib/client/react-query/axios';
import { TypeGroupGenPokeDX } from '../../types/models/GroupGenPokeDX';
import { PokemonDetails } from '../../types/models/Pokemon';
import { PokemonSpecie } from '../../types/models/PokemonSpecie';
import PokeView from '../../views/Pokemon';

type Props = {
  title: string | string[] | undefined;
};

const Pokemon: FC<Props> = ({ title }) => {
  return (
    <PageLayout>
      <Head>
        <title style={{ textTransform: 'capitalize' }}>{`Pokémon ${title}`}</title>
      </Head>
      <PokeView></PokeView>
    </PageLayout>
  );
};

export async function getStaticPaths() {
  let arrItems = [];

  for (let i = 1; i < 20; i++) {
    arrItems.push({ params: { id: `${i}` } });
  }

  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();
  const id = params?.id as string;
  let title = '';

  const getPokemon = async (id: string) => {
    console.log('Fetching 2 ' + id);
    const response = await axiosInstance.get<PokemonDetails>(
      `http://pokeapi.co/api/v2/pokemon/${id}`
    );
    return response.data;
  };

  const getSpecie = async (id: string) => {
    const response = await axiosInstance.get<PokemonSpecie>(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    title = response.data.name;
    return response.data;
  };

  async function getMapData() {
    const response = await axiosInstance.get<TypeGroupGenPokeDX>(
      /* `http://127.0.0.1:8787/genverpkdx` */
      'https://pokemon-wiki-api.pokemon-wiki.workers.dev/genverpkdx'
    );
    return response.data;
  }

  await Promise.all([
    queryClient.prefetchQuery(['pokemonDetails', id], () => getPokemon(id)),
    queryClient.prefetchQuery(['pokemonSpecie', id], () => getSpecie(id)),
    queryClient.fetchQuery(['mapaData'], () => getMapData()),
  ]);

  /* ·1 */

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      title: title,
    },
  };
};

export default Pokemon;
