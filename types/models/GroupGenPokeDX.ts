export type TypeGroupGenPokeDX = {
  gen: {
    name: string;
    altName: string;
    region: string;
    url: string;
    map: string;
  };
  pokedex: {
    name: string;
    id: number;
    url: string;
  }[];
  versions: {
    versionName: string;
    versionID: number;
    pokedexID: number;
    games: string[];
    gamesAcronyms: string[];
    url: string;
  };
  locations: {
    name: string;
    areas?: {
      name: string;
      url: string;
    }[];
    coords?: string[] | { x: number; y: number; h: number; w: number };
    url: string;
  }[];
}[];
