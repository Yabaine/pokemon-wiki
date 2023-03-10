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

  query.data?.chain.evolves_to.forEach((evolution) => {
    evolutions.push({
      name: evolution.species.name,
      url: evolution.species.url,
      evolves: {
        min_level: evolution.evolution_details[0].min_level,
        min_happiness: evolution.evolution_details[0].min_happiness,
        item: evolution.evolution_details[0].item ?? null,
        trade_species: evolution.evolution_details[0].trade_species,
      },
      sprite: null,
    });

    evolution.evolves_to.forEach((evolution) => {
      evolutions.push({
        name: evolution.species.name,
        url: evolution.species.url,
        evolves: {
          min_level: evolution.evolution_details[0].min_level,
          min_happiness: evolution.evolution_details[0].min_happiness,
          item: evolution.evolution_details[0].item ?? null,
          trade_species: evolution.evolution_details[0].trade_species,
        },
        sprite: null,
      });
    });
  });

  //Quita objetos duplicados
  /* const unique = evolutions.filter(
    (value, i, array) => array.findIndex((v2) => v2.name === value.name) === i
  ); */

  console.log(query.data, 'query');
  console.log(evolutions, 'evolutions');

  return evolutions;
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

//--------------------------------------------/

export interface EvolutionChain {
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

export interface Species {
  name: string;
  url: string;
}
