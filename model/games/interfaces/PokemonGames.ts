import { GAMES } from '../enums/Games';

export type GamesColors = {
  [key in GAMES]: {
    base: string;
    light: string;
    dark: string;
  };
};
