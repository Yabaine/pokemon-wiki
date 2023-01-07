import { GroupGenPoke, groupGenPoke } from '../lib/client/constants';

export const uniqueString = (length: number) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const isBrowser = () => typeof window !== 'undefined';

/**
 * min, max included
 */
export const getRandomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isUrl = (str: string) => {
  return /^https?:\/\//gi.test(str);
};

/**
 * in seconds
 */
export const sleep = (seconds: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000));
};

// this is not perfect, should be called in all jest.config.js
// jest imports with node, not ts-node
export const isGithubActionsAppEnv = (): boolean => {
  return process.env.APP_ENV === 'ci';
};

/**
 * Note: this might give wrong path in tests
 */
export const rootDirAbsolutePath = process.cwd();

/**
 * filter special chars and replace spaces with '_'
 */
export const filterSearchTerm = (
  searchTerm: string | undefined,
  operator: 'space' | 'or' = 'space'
): string | undefined => {
  // 'cat_dog' matches 'cat dog'
  const joinBy = operator === 'space' ? '_' : ' | ';

  return (
    searchTerm &&
    searchTerm
      .trim()
      .replace(/[^a-z0-9\s]+/gi, '') // remove special chars
      .split(/\s+/)
      .join(joinBy)
  );
};

// create function getPokedex parameter poke
// loop through GroupGenPoke and get same value as parameter in pokedex property
// return key of that value in GroupGenPoke object (gen1, gen2, etc) or undefined

export const getGamePokedex = (poke: string) => {
  let pokedex: string | undefined;
  let game;

  GroupGenPoke.map((el) => {
    if (el.pokedex[poke]?.name == poke) {
      pokedex = el.pokedex[poke].name;
      game = el.group;
    } else {
      return null;
    }
  });

  console.log(game.name[0]);
  return [pokedex, game];
};
