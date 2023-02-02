import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axios';

const getEvolutions = async (id: string) => {
  const response = await axiosInstance.get<EvolutionsChains>(
    `https://pokeapi.co/api/v2/evolution-chain/${id}`
  );
  return response.data;
};

export const useEvolutions = (id: string) => {
  const query = useQuery<EvolutionsChains, AxiosError>(['evolutionChain', id], () =>
    getEvolutions(id)
  );

  let reg = /\/(\d+)\//;
  let pokeID: string[] = [];
  let evolutions: EvolObjectPokemon = [];

  evolutions.unshift({
    name: query.data!?.chain.species.name,
    url: query.data!?.chain.species.url,
    evolves: {
      min_level: null,
      min_happiness: null,
      item: null,
      trade_species: null,
    },
    sprite: null,
  });

  pokeID.push(query.data!?.chain.species.url.match(reg)!?.[1]);
  query.data?.chain.evolves_to.map((evolution) => {
    pokeID.push(evolution.species.url.match(reg)!?.[1]);
    evolution.evolves_to.map((evolution2) => {
      pokeID.push(evolution2.species.url.match(reg)!?.[1]);
    });
  });

  let data = query.data!?.chain;

  return { data, pokeID };
};

export type Evolve = Omit<
  EvolutionDetail,
  | 'gender'
  | 'held_item'
  | 'known_move'
  | 'known_move_type'
  | 'location'
  | 'min_affection'
  | 'min_beauty'
  | 'party_species'
  | 'party_type'
  | 'relative_physical_stats'
  | 'trigger'
  | 'turn_upside_down'
  | 'time_of_day'
  | 'needs_overworld_rain'
>;

type EvolObjectPokemon = {
  name: string;
  url: string;
  evolves: Evolve;
  sprite: string | null;
}[];

export interface EvolutionsChains {
  baby_trigger_item: null;
  chain: Chain;
  id: number;
}

export interface Chain {
  evolution_details: EvolutionDetail[];
  evolves_to: Chain[];
  is_baby: boolean;
  species: Species;
}

type item = {
  name: string;
  url: string;
};

export interface EvolutionDetail {
  gender: null;
  held_item: null;
  item: item | null;
  known_move: null;
  known_move_type: null;
  location: null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: null;
  party_type: null;
  relative_physical_stats: null;
  time_of_day: string;
  trade_species: null;
  trigger: Species;
  turn_upside_down: boolean;
}

export interface Species {
  name: string;
  url: string;
}
