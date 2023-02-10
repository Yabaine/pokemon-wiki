import { GiCrossedSwords } from 'react-icons/gi';
import { IoEggOutline, IoStatsChart } from 'react-icons/io5';
import { MdCatchingPokemon, MdMap } from 'react-icons/md';
import { MOVEMENT_TYPE } from '../../types/models/PokemonMovement';

export const themes = [
  'theme-light',
  'theme-dark',
  'theme-blue',
  'theme-red',
  'theme-green',
  'theme-black',
];

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

export const Gens = [
  'generation-i',
  'generation-ii',
  'generation-iii',
  'generation-iv',
  'generation-v',
  'generation-vi',
  'generation-vii',
  'generation-viii',
];

export const TipoMovimientoDisponible: MOVEMENT_TYPE[] = [
  MOVEMENT_TYPE.MACHINE,
  MOVEMENT_TYPE.LEVELUP,
  MOVEMENT_TYPE.EGG,
  MOVEMENT_TYPE.TUTOR,
];

export const StatsVariables = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];

/* export const TipoMovimiento = [
  { tipo: 'machine' },
  { tipo: 'level-up' },
  { tipo: 'egg' },
  { tipo: 'tutor' },
]; */

//create an array of objects with the effectiveness of each type

export type EffectivnessTypes = {
  name: string;
  color: {
    base: string;
    lighten: string;
    darken: string;
  };
  type: string;
  damage: {
    [key: string]: number;
  };
  weakness: string[];
};

export const Effectivness = [
  {
    name: 'normal',
    color: {
      base: 'hsl(60,10.1%,69%)',
      lighten: 'hsl(60,10.1%,89%)',
      darken: 'hsl(60,10.1%,49%)',
    },
    type: 'normal',
    damage: {
      normal: 1,
      fire: 1,
      water: 1,
      electric: 1,
      grass: 1,
      ice: 1,
      fighting: 1,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 1,
      bug: 1,
      rock: 0.5,
      ghost: 0,
      dragon: 1,
      dark: 1,
      steel: 0.5,
      fairy: 1,
    },
    weakness: ['fighting'],
  },
  {
    name: 'fire',
    color: {
      base: 'hsl(25.6,84.8%,56.1%)',
      lighten: 'hsl(25.6,84.8%,76.1%)',
      darken: 'hsl(25.6,84.8%,36.1%)',
    },
    type: 'fire',
    damage: {
      normal: 1,
      fire: 0.5,
      water: 0.5,
      electric: 1,
      grass: 2,
      ice: 2,
      fighting: 1,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 1,
      bug: 2,
      rock: 0.5,
      ghost: 1,
      dragon: 0.5,
      dark: 1,
      steel: 2,
      fairy: 1,
    },
    weakness: ['water', 'ground', 'rock'],
  },
  {
    name: 'water',
    color: {
      base: 'hsl(220.9,82.5%,66.5%)',
      lighten: 'hsl(220.9,82.5%,86.5%)',
      darken: 'hsl(220.9,82.5%,46.5%)',
    },
    type: 'water',
    damage: {
      normal: 1,
      fire: 2,
      water: 0.5,
      electric: 0.5,
      grass: 0.5,
      ice: 1,
      fighting: 1,
      poison: 1,
      ground: 2,
      flying: 1,
      psychic: 1,
      bug: 1,
      rock: 2,
      ghost: 1,
      dragon: 0.5,
      dark: 1,
      steel: 1,
      fairy: 1,
    },
    weakness: ['grass', 'electric'],
  },
  {
    name: 'electric',
    color: {
      base: 'hsl(48.5,92.7%,57.1%)',
      lighten: 'hsl(48.5,92.7%,77.1%)',
      darken: 'hsl(48.5,92.7%,37.1%)',
    },
    type: 'electric',
    damage: {
      normal: 1,
      fire: 1,
      water: 2,
      electric: 0.5,
      grass: 0.5,
      ice: 1,
      fighting: 1,
      poison: 1,
      ground: 0,
      flying: 2,
      psychic: 1,
      bug: 1,
      rock: 1,
      ghost: 1,
      dragon: 0.5,
      dark: 1,
      steel: 1,
      fairy: 1,
    },
    weakness: ['ground'],
  },
  {
    name: 'grass',
    color: {
      base: 'hsl(97.6,52.3%,53.9%)',
      lighten: 'hsl(97.6,52.3%,73.9%)',
      darken: 'hsl(97.6,52.3%,33.9%)',
    },
    type: 'grass',
    damage: {
      normal: 1,
      fire: 0.5,
      water: 2,
      electric: 1,
      grass: 0.5,
      ice: 1,
      fighting: 1,
      poison: 0.5,
      ground: 2,
      flying: 0.5,
      psychic: 1,
      bug: 0.5,
      rock: 2,
      ghost: 1,
      dragon: 0.5,
      dark: 1,
      steel: 0.5,
      fairy: 1,
    },
    weakness: ['fire', 'ice', 'poison', 'flying', 'bug'],
  },
  {
    name: 'ice',
    color: {
      base: 'hsl(177.3,46.9%,72%)',
      lighten: 'hsl(177.3,46.9%,92%)',
      darken: 'hsl(177.3,46.9%,52%)',
    },
    type: 'ice',
    damage: {
      normal: 1,
      fire: 0.5,
      water: 0.5,
      electric: 1,
      grass: 2,
      ice: 0.5,
      fighting: 1,
      poison: 1,
      ground: 2,
      flying: 2,
      psychic: 1,
      bug: 1,
      rock: 1,
      ghost: 1,
      dragon: 2,
      dark: 1,
      steel: 0.5,
      fairy: 1,
    },
    weakness: ['fire', 'fighting', 'rock', 'steel'],
  },
  {
    name: 'fighting',
    color: {
      base: 'hsl(2.3,65.8%,45.9%)',
      lighten: 'hsl(2.3,65.8%,65.9%)',
      darken: 'hsl(2.3,65.8%,25.9%)',
    },
    type: 'fighting',
    damage: {
      normal: 2,
      fire: 1,
      water: 1,
      electric: 1,
      grass: 1,
      ice: 2,
      fighting: 1,
      poison: 0.5,
      ground: 1,
      flying: 0.5,
      psychic: 0.5,
      bug: 0.5,
      rock: 2,
      ghost: 0,
      dragon: 1,
      dark: 2,
      steel: 2,
      fairy: 0.5,
    },
    weakness: ['flying', 'psychic', 'fairy'],
  },
  {
    name: 'poison',
    color: {
      base: 'hsl(301.2,44.9%,44.1%)',
      lighten: 'hsl(301.2,44.9%,64.1%)',
      darken: 'hsl(301.2,44.9%,24.1%)',
    },
    type: 'poison',
    damage: {
      normal: 1,
      fire: 1,
      water: 1,
      electric: 1,
      grass: 2,
      ice: 1,
      fighting: 1,
      poison: 0.5,
      ground: 0.5,
      flying: 1,
      psychic: 1,
      bug: 1,
      rock: 0.5,
      ghost: 0.5,
      dragon: 1,
      dark: 1,
      steel: 0,
      fairy: 2,
    },
    weakness: ['ground', 'psychic'],
  },
  {
    name: 'ground',
    color: {
      base: 'hsl(43.2,68.3%,64.1%)',
      lighten: 'hsl(43.2,68.3%,84.1%)',
      darken: 'hsl(43.2,68.3%,44.1%)',
    },
    type: 'ground',
    damage: {
      normal: 1,
      fire: 2,
      water: 1,
      electric: 2,
      grass: 0.5,
      ice: 1,
      fighting: 1,
      poison: 2,
      ground: 1,
      flying: 0,
      psychic: 1,
      bug: 0.5,
      rock: 2,
      ghost: 1,
      dragon: 1,
      dark: 1,
      steel: 2,
      fairy: 1,
    },
    weakness: ['water', 'grass', 'ice'],
  },
  {
    name: 'flying',
    color: {
      base: 'hsl(255.6,80.6%,75.7%)',
      lighten: 'hsl(255.6,80.6%,95.7%)',
      darken: 'hsl(255.6,80.6%,55.7%)',
    },
    type: 'flying',
    damage: {
      normal: 1,
      fire: 1,
      water: 1,
      electric: 0.5,
      grass: 2,
      ice: 1,
      fighting: 2,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 1,
      bug: 2,
      rock: 0.5,
      ghost: 1,
      dragon: 1,
      dark: 1,
      steel: 0.5,
      fairy: 1,
    },
    weakness: ['electric', 'ice', 'rock'],
  },
  {
    name: 'psychic',
    color: {
      base: 'hsl(341.7,93.2%,65.5%)',
      lighten: 'hsl(341.7,93.2%,85.5%)',
      darken: 'hsl(341.7,93.2%,45.5%)',
    },
    type: 'psychic',
    damage: {
      normal: 1,
      fire: 1,
      water: 1,
      electric: 1,
      grass: 1,
      ice: 1,
      fighting: 2,
      poison: 2,
      ground: 1,
      flying: 1,
      psychic: 0.5,
      bug: 1,
      rock: 1,
      ghost: 1,
      dragon: 1,
      dark: 0,
      steel: 0.5,
      fairy: 1,
    },
    weakness: ['bug', 'ghost', 'dark'],
  },
  {
    name: 'bug',
    color: {
      base: 'hsl(67.2,75.4%,41.4%)',
      lighten: 'hsl(67.2,75.4%,61.4%)',
      darken: 'hsl(67.2,75.4%,21.4%)',
    },
    type: 'bug',
    damage: {
      normal: 1,
      fire: 0.5,
      water: 1,
      electric: 1,
      grass: 2,
      ice: 1,
      fighting: 0.5,
      poison: 0.5,
      ground: 1,
      flying: 0.5,
      psychic: 2,
      bug: 1,
      rock: 1,
      ghost: 0.5,
      dragon: 1,
      dark: 2,
      steel: 0.5,
      fairy: 0.5,
    },
    weakness: ['fire', 'flying', 'rock'],
  },
  {
    name: 'rock',
    color: {
      base: 'hsl(50.2,54.2%,46.3%)',
      lighten: 'hsl(50.2,54.2%,66.3%)',
      darken: 'hsl(50.2,54.2%,26.3%)',
    },
    type: 'rock',
    damage: {
      normal: 1,
      fire: 2,
      water: 1,
      electric: 1,
      grass: 1,
      ice: 2,
      fighting: 0.5,
      poison: 1,
      ground: 0.5,
      flying: 2,
      psychic: 1,
      bug: 2,
      rock: 1,
      ghost: 1,
      dragon: 1,
      dark: 1,
      steel: 0.5,
      fairy: 1,
    },
    weakness: ['fighting', 'ground', 'steel', 'water', 'grass'],
  },
  {
    name: 'ghost',
    color: {
      base: 'hsl(266.3,26.9%,46.7%)',
      lighten: 'hsl(266.3,26.9%,66.7%)',
      darken: 'hsl(266.3,26.9%,26.7%)',
    },
    type: 'ghost',
    damage: {
      normal: 0,
      fire: 1,
      water: 1,
      electric: 1,
      grass: 1,
      ice: 1,
      fighting: 1,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 2,
      bug: 1,
      rock: 1,
      ghost: 2,
      dragon: 1,
      dark: 0.5,
      steel: 1,
      fairy: 1,
    },
    weakness: ['ghost', 'dark'],
  },
  {
    name: 'dragon',
    color: {
      base: 'hsl(257.5,97.1%,59.8%)',
      lighten: 'hsl(257.5,97.1%,79.8%)',
      darken: 'hsl(257.5,97.1%,39.8%)',
    },
    type: 'dragon',
    damage: {
      normal: 1,
      fire: 0.5,
      water: 0.5,
      electric: 0.5,
      grass: 0.5,
      ice: 2,
      fighting: 1,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 1,
      bug: 1,
      rock: 1,
      ghost: 1,
      dragon: 2,
      dark: 1,
      steel: 0.5,
      fairy: 0,
    },
    weakness: ['ice', 'dragon', 'fairy'],
  },
  {
    name: 'dark',
    color: {
      base: 'hsl(24.3,23.1%,35.7%)',
      lighten: 'hsl(24.3,23.1%,55.7%)',
      darken: 'hsl(24.3,23.1%,15.7%)',
    },
    type: 'dark',
    damage: {
      normal: 1,
      fire: 1,
      water: 1,
      electric: 1,
      grass: 1,
      ice: 1,
      fighting: 0.5,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 2,
      bug: 1,
      rock: 1,
      ghost: 2,
      dragon: 1,
      dark: 0.5,
      steel: 1,
      fairy: 0.5,
    },
    weakness: ['fighting', 'bug', 'fairy'],
  },
  {
    name: 'steel',
    color: {
      base: 'hsl(240,19%,76.3%)',
      lighten: 'hsl(240,19%,96.3%)',
      darken: 'hsl(240,19%,56.3%)',
    },
    type: 'steel',
    damage: {
      normal: 1,
      fire: 0.5,
      water: 0.5,
      electric: 0.5,
      grass: 1,
      ice: 2,
      fighting: 2,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 1,
      bug: 1,
      rock: 2,
      ghost: 1,
      dragon: 1,
      dark: 1,
      steel: 0.5,
      fairy: 2,
    },
    weakness: ['fire', 'fighting', 'ground'],
  },
  {
    name: 'fairy',
    color: {
      base: 'hsl(330.4,49.7%,68%)',
      lighten: 'hsl(330.4,49.7%,88%)',
      darken: 'hsl(330.4,49.7%,48%)',
    },
    type: 'fairy',
    damage: {
      normal: 1,
      fire: 0.5,
      water: 1,
      electric: 1,
      grass: 1,
      ice: 1,
      fighting: 2,
      poison: 0.5,
      ground: 1,
      flying: 1,
      psychic: 1,
      bug: 1,
      rock: 1,
      ghost: 1,
      dragon: 2,
      dark: 2,
      steel: 0.5,
      fairy: 1,
    },
    weakness: ['poison', 'steel'],
  },
];
