import { MdCatchingPokemon, MdMap } from 'react-icons/md';
import { IoStatsChart, IoEggOutline } from 'react-icons/io5';
import { GiCrossedSwords } from 'react-icons/gi';
import { IconBaseProps } from 'react-icons';

export interface VersionGroup {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Generations {
  count: number;
  next: null;
  previous: null;
  results: Result[];
}

export interface Pokedex {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export const Redirects = {
  NOT_FOUND: {
    notFound: true,
  },
} as const;

export const Generations = {
  count: 8,
  next: null,
  previous: null,
  results: [
    {
      name: 'generation-i',
      url: 'https://pokeapi.co/api/v2/generation/1/',
    },
    {
      name: 'generation-ii',
      url: 'https://pokeapi.co/api/v2/generation/2/',
    },
    {
      name: 'generation-iii',
      url: 'https://pokeapi.co/api/v2/generation/3/',
    },
    {
      name: 'generation-iv',
      url: 'https://pokeapi.co/api/v2/generation/4/',
    },
    {
      name: 'generation-v',
      url: 'https://pokeapi.co/api/v2/generation/5/',
    },
    {
      name: 'generation-vi',
      url: 'https://pokeapi.co/api/v2/generation/6/',
    },
    {
      name: 'generation-vii',
      url: 'https://pokeapi.co/api/v2/generation/7/',
    },
    {
      name: 'generation-viii',
      url: 'https://pokeapi.co/api/v2/generation/8/',
    },
  ],
};

export const Pokedex = {
  count: 29,
  next: 'https://pokeapi.co/api/v2/pokedex?offset=20&limit=9',
  previous: null,
  results: [
    {
      name: 'national',
      url: 'https://pokeapi.co/api/v2/pokedex/1/',
    },
    {
      name: 'kanto',
      url: 'https://pokeapi.co/api/v2/pokedex/2/',
    },
    {
      name: 'original-johto',
      url: 'https://pokeapi.co/api/v2/pokedex/3/',
    },
    {
      name: 'hoenn',
      url: 'https://pokeapi.co/api/v2/pokedex/4/',
    },
    {
      name: 'original-sinnoh',
      url: 'https://pokeapi.co/api/v2/pokedex/5/',
    },
    {
      name: 'extended-sinnoh',
      url: 'https://pokeapi.co/api/v2/pokedex/6/',
    },
    {
      name: 'updated-johto',
      url: 'https://pokeapi.co/api/v2/pokedex/7/',
    },
    {
      name: 'original-unova',
      url: 'https://pokeapi.co/api/v2/pokedex/8/',
    },
    {
      name: 'updated-unova',
      url: 'https://pokeapi.co/api/v2/pokedex/9/',
    },
    {
      name: 'conquest-gallery',
      url: 'https://pokeapi.co/api/v2/pokedex/11/',
    },
    {
      name: 'kalos-central',
      url: 'https://pokeapi.co/api/v2/pokedex/12/',
    },
    {
      name: 'kalos-coastal',
      url: 'https://pokeapi.co/api/v2/pokedex/13/',
    },
    {
      name: 'kalos-mountain',
      url: 'https://pokeapi.co/api/v2/pokedex/14/',
    },
    {
      name: 'updated-hoenn',
      url: 'https://pokeapi.co/api/v2/pokedex/15/',
    },
    {
      name: 'original-alola',
      url: 'https://pokeapi.co/api/v2/pokedex/16/',
    },
    {
      name: 'original-melemele',
      url: 'https://pokeapi.co/api/v2/pokedex/17/',
    },
    {
      name: 'original-akala',
      url: 'https://pokeapi.co/api/v2/pokedex/18/',
    },
    {
      name: 'original-ulaula',
      url: 'https://pokeapi.co/api/v2/pokedex/19/',
    },
    {
      name: 'original-poni',
      url: 'https://pokeapi.co/api/v2/pokedex/20/',
    },
    {
      name: 'updated-alola',
      url: 'https://pokeapi.co/api/v2/pokedex/21/',
    },
  ],
};

export type GroupGenPokeDX = {
  gen: {
    name: string;
    altName: string;
    url: string;
  };
  pokedex: {
    name: string;
    id: number;
    url: string;
  }[];

  group: {
    versionName: string;
    versionID: number;
    pokedexID: number;
    games: string[];
    gamesAcronyms: string[];
    url: string;
  };
}[];

type PokemonTabs = {
  name: string;
  icon: JSX.Element;
};

export const PokemonTabs = [
  { name: 'general', icon: <MdCatchingPokemon /> },
  { name: 'stats', icon: <IoStatsChart /> },
  { name: 'location', icon: <MdMap /> },
  { name: 'moveset', icon: <GiCrossedSwords /> },
  { name: 'breeding', icon: <IoEggOutline /> },
];

/* export const GroupGenPoke: groupGenPoke = [
  {
    gen: {
      name: 'generation-i',
      altName: 'GEN I',
      url: 'https://pokeapi.co/api/v2/generation/1/',
    },
    pokedex: { kanto: { name: 'kanto', url: 'https://pokeapi.co/api/v2/pokedex/2/' } },
    group: {
      'red-blue': {
        name: { blue: 'blue', red: 'red' },
        url: 'https://pokeapi.co/api/v2/version-group/1/',
      },
      yellow: {
        name: { yellow: 'yellow' },
        url: 'https://pokeapi.co/api/v2/version-group/2/',
      },
    },
  },

  {
    gen: {
      name: 'generation-ii',
      altName: 'GEN II',
      url: 'https://pokeapi.co/api/v2/generation/1/',
    },
    pokedex: {
      'orignal-johto': {
        name: 'original-johto',
        url: 'https://pokeapi.co/api/v2/pokedex/3/',
      },
    },

    group: {
      'gold-silver': {
        name: { gold: 'gold', silver: 'silver' },
        url: 'https://pokeapi.co/api/v2/version-group/3/',
      },
      crystal: {
        name: { crystal: 'crystal' },
        url: 'https://pokeapi.co/api/v2/version-group/4/',
      },
    },
  },

  {
    gen: {
      name: 'generation-iii',
      altName: 'GEN III',
      url: 'https://pokeapi.co/api/v2/generation/3/',
    },
    pokedex: { hoenn: { name: 'hoenn', url: 'https://pokeapi.co/api/v2/pokedex/4/' } },

    group: {
      'ruby-sapphire': {
        name: { ruby: 'ruby', sapphire: 'sapphire' },
        url: 'https://pokeapi.co/api/v2/version-group/5/',
      },
      emerald: {
        name: { emerald: 'emerald' },
        url: 'https://pokeapi.co/api/v2/version-group/6/',
      },
      'firered-leafgreen': {
        name: { firered: 'firered', leafgreen: 'leafgreen' },
        url: 'https://pokeapi.co/api/v2/version-group/7/',
      },
    },
  },
  {
    gen: {
      name: 'generation-iv',
      altName: 'GEN IV',
      url: 'https://pokeapi.co/api/v2/generation/4/',
    },
    pokedex: {
      'original-sinnoh': {
        name: 'original-sinnoh',
        url: 'https://pokeapi.co/api/v2/pokedex/5/',
      },
      'extended-sinnoh': {
        name: 'extended-sinnoh',
        url: 'https://pokeapi.co/api/v2/pokedex/6/',
      },
      'updated-johto': {
        name: 'updated-johto',
        url: 'https://pokeapi.co/api/v2/pokedex/7/',
      },
    },

    group: {
      'diamond-pearl': {
        name: { diamond: 'diamond', pearl: 'pearl' },
        url: 'https://pokeapi.co/api/v2/version-group/8/',
      },
      platinum: {
        name: { platinum: 'platinum' },
        url: 'https://pokeapi.co/api/v2/version-group/9/',
      },
      'heartgold-soulsilver': {
        name: { heartgold: 'heartgold', soulsilver: 'soulsilver' },
        url: 'https://pokeapi.co/api/v2/version-group/10/',
      },
    },
  },
  {
    gen: {
      name: 'generation-v',
      altName: 'GEN V',
      url: 'https://pokeapi.co/api/v2/generation/5/',
    },
    pokedex: {
      'original-unova': {
        name: 'original-unova',
        url: 'https://pokeapi.co/api/v2/pokedex/8/',
      },
      'updated-unova': {
        name: 'updated-unova',
        url: 'https://pokeapi.co/api/v2/pokedex/9/',
      },
    },

    group: {
      'black-white': {
        name: { black: 'black', white: 'white' },
        url: 'https://pokeapi.co/api/v2/version-group/11/',
      },
      'black-2-white-2': {
        name: { 'black-2': 'black-2', 'white-2': 'white-2' },
        url: 'https://pokeapi.co/api/v2/version-group/14/',
      },
    },
  },
  {
    gen: {
      name: 'generation-vi',
      altName: 'GEN VI',
      url: 'https://pokeapi.co/api/v2/generation/6/',
    },
    pokedex: {
      'kalos-central': {
        name: 'kalos-central',
        url: 'https://pokeapi.co/api/v2/pokedex/12/',
      },
      'kalos-coastal': {
        name: 'kalos-coastal',
        url: 'https://pokeapi.co/api/v2/pokedex/13/',
      },
      'kalos-mountain': {
        name: 'kalos-mountain',
        url: 'https://pokeapi.co/api/v2/pokedex/14/',
      },
      'updated-hoenn': {
        name: 'updated-hoenn',
        url: 'https://pokeapi.co/api/v2/pokedex/15/',
      },
    },

    group: {
      'x-y': {
        name: { x: 'x', y: 'y' },
        url: 'https://pokeapi.co/api/v2/version-group/15/',
      },
      'omega-ruby-alpha-sapphire': {
        name: { 'omega-ruby': 'omega-ruby', 'alpha-sapphire': 'alpha-sapphire' },
        url: 'https://pokeapi.co/api/v2/version-group/16/',
      },
    },
  },
  {
    gen: {
      name: 'generation-vii',
      altName: 'GEN VII',
      url: 'https://pokeapi.co/api/v2/generation/7/',
    },
    pokedex: {
      'original-alola': {
        name: 'original-alola',
        url: 'https://pokeapi.co/api/v2/pokedex/16/',
      },
      'original-melemele': {
        name: 'original-melemele',
        url: 'https://pokeapi.co/api/v2/pokedex/17/',
      },
      'original-akala': {
        name: 'original-akala',
        url: 'https://pokeapi.co/api/v2/pokedex/18/',
      },
      'original-ulaula': {
        name: 'original-ulaula',
        url: 'https://pokeapi.co/api/v2/pokedex/19/',
      },
      'original-poni': {
        name: 'original-poni',
        url: 'https://pokeapi.co/api/v2/pokedex/20/',
      },
      'updated-alola': {
        name: 'updated-alola',
        url: 'https://pokeapi.co/api/v2/pokedex/21/',
      },
    },

    group: {
      'sun-moon': {
        name: { sun: 'sun', moon: 'moon' },
        url: 'https://pokeapi.co/api/v2/version-group/17/',
      },

      'ultra-sun-ultra-moon': {
        name: { 'ultra-sun': 'ultra-sun', 'ultra-moon': 'ultra-moon' },
        url: 'https://pokeapi.co/api/v2/version-group/18/',
      },
      'lets-go-pikachu-lets-go-eevee': {
        name: { 'lets-go-pikachu': 'lets-go-pikachu', 'lets-go-eevee': 'lets-go-eevee' },
        url: 'https://pokeapi.co/api/v2/version-group/19/',
      },
    },
  },
]; */

export const MainPokedex = [
  'kanto',
  'original-johto',
  'hoenn',
  'original-sinnoh',
  'extended-sinnoh',
  'updated-johto',
  'original-unova',
  'updated-unova',
  'kalos-central',
  'kalos-coastal',
  'kalos-mountain',
  'updated-hoenn',
  'original-alola',
  'original-melemele',
  'original-akala',
  'original-ulaula',
  'original-poni',
  'updated-alola',
  'updated-melemele',
  'updated-akala',
  'updated-ulaula',
  'updated-poni',
  'letsgo-kanto',
  'galar',
  'isle-of-armor',
  'crown-tundra',
  'hisui',
];
