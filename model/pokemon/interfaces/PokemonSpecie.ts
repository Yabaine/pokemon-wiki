import { GAMES } from '../../games/enums/Games';
import { GENERATIONS } from '../../generations/enums/Generations';

export interface PokemonSpecie {
  base_happiness: number;
  capture_rate: number;
  color: Color;
  egg_groups: NameUrl[];
  evolution_chain: EvolutionChain;
  evolves_from_species: NameUrl;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: Generation;
  growth_rate: NameUrl;
  habitat: NameUrl;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: NameUrl;
  varieties: Variety[];
}

export interface NameUrl {
  name: string;
  url: string;
}

export interface Color {
  name: PokemonColors;
  url: string;
}

export interface Languages {
  name: string;
  url: string;
}

export interface Version {
  name: GAMES;
  url: string;
}

export interface Generation {
  name: GENERATIONS;
  url: string;
}

export interface EvolutionChain {
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Languages;
  version: Version;
}

export interface Genus {
  genus: string;
  language: Languages;
}

export interface Name {
  language: Languages;
  name: string;
}

export interface PalParkEncounter {
  area: NameUrl;
  base_score: number;
  rate: number;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: NameUrl;
}

export interface Variety {
  is_default: boolean;
  pokemon: NameUrl;
}

export type PokemonColors =
  | 'RED'
  | 'BLUE'
  | 'YELLOW'
  | 'GREEN'
  | 'BLACK'
  | 'BROWN'
  | 'PURPLE'
  | 'GRAY'
  | 'WHITE'
  | 'PINK';
