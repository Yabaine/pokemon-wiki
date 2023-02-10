import { ColorsType } from '../interfaces/TypesColor';
import { POKEMON_TYPE } from '../enums/PokemonType';

export const TYPES_COLOR: ColorsType = {
  [POKEMON_TYPE.NORMAL]: {
    base: 'hsl(60,10.1%,69%)',
    light: 'hsl(60,10.1%,89%)',
    dark: 'hsl(60,10.1%,49%)',
  },
  [POKEMON_TYPE.FIRE]: {
    base: 'hsl(25.6,84.8%,56.1%)',
    light: 'hsl(25.6,84.8%,76.1%)',
    dark: 'hsl(25.6,84.8%,36.1%)',
  },
  [POKEMON_TYPE.WATER]: {
    base: 'hsl(220.9,82.5%,66.5%)',
    light: 'hsl(220.9,82.5%,86.5%)',
    dark: 'hsl(220.9,82.5%,46.5%)',
  },
  [POKEMON_TYPE.ELECTRIC]: {
    base: 'hsl(48.5,92.7%,57.1%)',
    light: 'hsl(48.5,92.7%,77.1%)',
    dark: 'hsl(48.5,92.7%,37.1%)',
  },
  [POKEMON_TYPE.GRASS]: {
    base: 'hsl(97.6,52.3%,53.9%)',
    light: 'hsl(97.6,52.3%,73.9%)',
    dark: 'hsl(97.6,52.3%,33.9%)',
  },
  [POKEMON_TYPE.ICE]: {
    base: 'hsl(177.3,46.9%,72%)',
    light: 'hsl(177.3,46.9%,92%)',
    dark: 'hsl(177.3,46.9%,52%)',
  },
  [POKEMON_TYPE.FIGHTING]: {
    base: 'hsl(2.3,65.8%,45.9%)',
    light: 'hsl(2.3,65.8%,65.9%)',
    dark: 'hsl(2.3,65.8%,25.9%)',
  },
  [POKEMON_TYPE.POISON]: {
    base: 'hsl(301.2,44.9%,44.1%)',
    light: 'hsl(301.2,44.9%,64.1%)',
    dark: 'hsl(301.2,44.9%,24.1%)',
  },
  [POKEMON_TYPE.GROUND]: {
    base: 'hsl(43.2,68.3%,64.1%)',
    light: 'hsl(43.2,68.3%,84.1%)',
    dark: 'hsl(43.2,68.3%,44.1%)',
  },

  [POKEMON_TYPE.FLYING]: {
    base: 'hsl(255.6,80.6%,75.7%)',
    light: 'hsl(255.6,80.6%,95.7%)',
    dark: 'hsl(255.6,80.6%,55.7%)',
  },
  [POKEMON_TYPE.PSYCHIC]: {
    base: 'hsl(341.7,93.2%,65.5%)',
    light: 'hsl(341.7,93.2%,85.5%)',
    dark: 'hsl(341.7,93.2%,45.5%)',
  },
  [POKEMON_TYPE.BUG]: {
    base: 'hsl(67.2,75.4%,41.4%)',
    light: 'hsl(67.2,75.4%,61.4%)',
    dark: 'hsl(67.2,75.4%,21.4%)',
  },

  [POKEMON_TYPE.ROCK]: {
    base: 'hsl(50.2,54.2%,46.3%)',
    light: 'hsl(50.2,54.2%,66.3%)',
    dark: 'hsl(50.2,54.2%,26.3%)',
  },
  [POKEMON_TYPE.GHOST]: {
    base: 'hsl(266.3,26.9%,46.7%)',
    light: 'hsl(266.3,26.9%,66.7%)',
    dark: 'hsl(266.3,26.9%,26.7%)',
  },
  [POKEMON_TYPE.DRAGON]: {
    base: 'hsl(257.5,97.1%,59.8%)',
    light: 'hsl(257.5,97.1%,79.8%)',
    dark: 'hsl(257.5,97.1%,39.8%)',
  },
  [POKEMON_TYPE.DARK]: {
    base: 'hsl(24.3,23.1%,35.7%)',
    light: 'hsl(24.3,23.1%,55.7%)',
    dark: 'hsl(24.3,23.1%,15.7%)',
  },
  [POKEMON_TYPE.STEEL]: {
    base: 'hsl(240,19%,76.3%)',
    light: 'hsl(240,19%,96.3%)',
    dark: 'hsl(240,19%,56.3%)',
  },
  [POKEMON_TYPE.FAIRY]: {
    base: 'hsl(330.4,49.7%,68%)',
    light: 'hsl(330.4,49.7%,88%)',
    dark: 'hsl(330.4,49.7%,48%)',
  },
};
