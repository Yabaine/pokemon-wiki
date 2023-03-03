import { GAMES } from '../enums/Games';
import { GamesColors } from '../interfaces/PokemonGames';

export const GAMES_COLOR: GamesColors = {
  [GAMES.RED]: {
    base: 'hsl(359, 100%, 51%)',
    light: 'hsl(359, 100%, 71%)',
    dark: 'hsl(359, 100%, 31%)',
  },
  [GAMES.BLUE]: {
    base: 'hsl(240, 100%, 61%)',
    light: 'hsl(240, 100%, 81%)',
    dark: 'hsl(240, 100%, 41%)',
  },
  [GAMES.YELLOW]: {
    base: 'hsl(58, 100%, 75%)',
    light: 'hsl(58, 100%, 95%)',
    dark: 'hsl(58, 100%, 55%)',
  },
  [GAMES.GOLD]: {
    base: 'hsl(46, 64%, 52%)',
    light: 'hsl(46, 64%, 72%)',
    dark: 'hsl(46, 64%, 32%)',
  },
  [GAMES.SILVER]: {
    base: 'hsl(240, 6%, 73%)',
    light: 'hsl(240, 6%, 93%)',
    dark: 'hsl(240, 6%, 53%)',
  },
  [GAMES.CRYSTAL]: {
    base: 'hsl(178, 39%, 87%)',
    light: 'hsl(178, 39%, 100%)',
    dark: 'hsl(178, 39%, 67%)',
  },
  [GAMES.RUBY]: {
    base: 'hsl(358, 100%, 34%)',
    light: 'hsl(358, 100%, 74%)',
    dark: 'hsl(358, 100%, 14%)',
  },
  [GAMES.SAPPHIRE]: {
    base: 'hsl(236, 57%, 43%)',
    light: 'hsl(236, 57%, 83%)',
    dark: 'hsl(236, 57%, 23%)',
  },
  [GAMES.EMERALD]: {
    base: 'hsl(151, 65%, 48%)',
    light: 'hsl(151, 65%, 78%)',
    dark: 'hsl(151, 65%, 28%)',
  },
  [GAMES.FIRE_RED]: {
    base: 'hsl(11, 94%, 57%)',
    light: 'hsl(11, 94%, 77%)',
    dark: 'hsl(11, 94%, 37%)',
  },
  [GAMES.LEAF_GREEN]: {
    base: 'hsl(147, 23%, 45%)',
    light: 'hsl(147, 23%, 65%)',
    dark: 'hsl(147, 23%, 25%)',
  },
  [GAMES.DIAMOND]: {
    base: 'hsl(188, 100%, 30%)',
    light: 'hsl(188, 100%, 50%)',
    dark: 'hsl(188, 100%, 10%)',
  },
  [GAMES.PEARL]: {
    base: 'hsl(342, 30%, 80%)',
    light: 'hsl(342, 30%, 100%)',
    dark: 'hsl(342, 30%, 60%)',
  },
  [GAMES.PLATINUM]: {
    base: 'hsl(140, 1%, 44%)',
    light: 'hsl(140, 1%, 64%)',
    dark: 'hsl(140, 1%, 24%)',
  },
  [GAMES.HEART_GOLD]: {
    base: 'hsl(46, 64%, 52%)',
    light: 'hsl(46, 64%, 72%)',
    dark: 'hsl(46, 64%, 32%)',
  },
  [GAMES.SOUL_SILVER]: {
    base: 'hsl(240, 6%, 73%)',
    light: 'hsl(240, 6%, 93%)',
    dark: 'hsl(240, 6%, 53%)',
  },
  [GAMES.BLACK]: {
    base: 'hsl(238, 1%, 30%)',
    light: 'hsl(238, 1%, 50%)',
    dark: 'hsl(238, 1%, 10%)',
  },
  [GAMES.WHITE]: {
    base: 'hsl(238, 0%, 95%)',
    light: 'hsl(238, 0%, 100%)',
    dark: 'hsl(238, 0%, 90%)',
  },
  [GAMES.BLACK_2]: {
    base: 'hsl(238, 1%, 30%)',
    light: 'hsl(238, 1%, 50%)',
    dark: 'hsl(238, 1%, 10%)',
  },
  [GAMES.WHITE_2]: {
    base: 'hsl(238, 0%, 95%)',
    light: 'hsl(238, 0%, 100%)',
    dark: 'hsl(238, 0%, 90%)',
  },
  [GAMES.X]: {
    base: 'hsl(246, 92%, 65%)',
    light: 'hsl(246, 92%, 85%)',
    dark: 'hsl(246, 92%, 45%)',
  },
  [GAMES.Y]: {
    base: 'hsl(337, 100%, 38%)',
    light: 'hsl(337, 100%, 58%)',
    dark: 'hsl(337, 100%, 18%)',
  },
  [GAMES.OMEGA_RUBY]: {
    base: 'hsl(358, 100%, 34%)',
    light: 'hsl(358, 100%, 74%)',
    dark: 'hsl(358, 100%, 14%)',
  },
  [GAMES.ALPHA_SAPPHIRE]: {
    base: 'hsl(236, 57%, 43%)',
    light: 'hsl(236, 57%, 83%)',
    dark: 'hsl(236, 57%, 23%)',
  },
  [GAMES.SUN]: {
    base: 'hsl(41, 100%, 70%)',
    light: 'hsl(41, 100%, 90%)',
    dark: 'hsl(41, 100%, 50%)',
  },
  [GAMES.MOON]: {
    base: 'hsl(265, 77%, 43%)',
    light: 'hsl(265, 77%, 63%)',
    dark: 'hsl(265, 77%, 23%)',
  },
  [GAMES.ULTRA_SUN]: {
    base: 'hsl(41, 100%, 70%)',
    light: 'hsl(41, 100%, 90%)',
    dark: 'hsl(41, 100%, 50%)',
  },
  [GAMES.ULTRA_MOON]: {
    base: 'hsl(265, 77%, 43%)',
    light: 'hsl(265, 77%, 63%)',
    dark: 'hsl(265, 77%, 23%)',
  },
  [GAMES.LETS_GO_EEVEE]: {
    base: 'hsl(26, 51%, 51%)',
    light: 'hsl(26, 51%, 71%)',
    dark: 'hsl(26, 51%, 31%)',
  },
  [GAMES.LETS_GO_PIKACHU]: {
    base: 'hsl(58, 100%, 75%)',
    light: 'hsl(58, 100%, 95%)',
    dark: 'hsl(58, 100%, 55%)',
  },
  [GAMES.SHIELD]: {
    base: 'hsl(336, 87%, 55%)',
    light: 'hsl(336, 87%, 75%)',
    dark: 'hsl(336, 87%, 35%)',
  },
  [GAMES.SWORD]: {
    base: 'hsl(202, 85%, 60%)',
    light: 'hsl(202, 85%, 80%)',
    dark: 'hsl(202, 85%, 40%)',
  },
  [GAMES.BRILLIANT_DIAMOND]: {
    base: 'hsl(188, 100%, 30%)',
    light: 'hsl(188, 100%, 50%)',
    dark: 'hsl(188, 100%, 10%)',
  },
  [GAMES.SHINING_PEARL]: {
    base: 'hsl(342, 30%, 80%)',
    light: 'hsl(342, 30%, 100%)',
    dark: 'hsl(342, 30%, 60%)',
  },
  [GAMES.LEGENDS_ARCEUS]: {
    base: 'hsl(166, 100%, 47%)',
    light: 'hsl(166, 100%, 67%)',
    dark: 'hsl(166, 100%, 27%)',
  },
};
