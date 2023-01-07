export type PokeNameUrl = {
  name: string;
  url: string;
};

export type PokemonFrontShiny = {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
};

/* export type PokemonSprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: PokemonFrontShiny;
    'official-artwork': {
      front_default: string | null;
    };
  };
  versions: {
    'generation-i': {
      'red-blue': {
        back_default: string | null;
        back_gray: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_gray: string | null;
        front_transparent: string | null;
      };
      yellow: {
        back_default: string | null;
        back_gray: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_gray: string | null;
        front_transparent: string | null;
      };
    };
    'generation-ii': {
      crystal: {
        back_default: string | null;
        back_shiny: string | null;
        back_shiny_transparent: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_shiny: string | null;
        front_shiny_transparent: string | null;
        front_transparent: string | null;
      };
      gold: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
        front_transparent: string | null;
      };
      silver: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
        front_transparent: string | null;
      };
    };
    'generation-iii': {
      emerald: {
        front_default: string | null;
        front_shiny: string | null;
      };
      'firered-leafgreen': {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      'ruby-sapphire': {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
    };
    'generation-iv': any;
    'generation-v': any;
    'generation-vi': any;
    'generation-vii': any;
    'generation-viii': any;
  };
}; */

export type PokemonType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeNameUrl[] | [];
};

/* export type PokemonDetails = {
  abilities: [
    {
      ability: PokeNameUrl;
      is_hidden: boolean;
      slot: number;
    }
  ];
  base_experience: number;
  forms: [PokeNameUrl];
  game_indices: [
    {
      game_index: number;
      version: PokeNameUrl;
    }
  ];
  height: number;
  held_items: [
    {
      item: PokeNameUrl;
      version_details: [
        {
          rarity: number;
          version: PokeNameUrl;
        }
      ];
    }
  ];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: [
    {
      move: PokeNameUrl;
      version_group_details: [
        {
          level_earned_at: number;
          move_learn_method: PokeNameUrl;
        }
      ];
    }
  ];
  name: string;
  order: number;
  past_types: [];
  species: PokeNameUrl;
  sprites: PokemonSprites;

  stats: [
    {
      base_stat: number;
      effort: number;
      stat: PokeNameUrl;
    }
  ];
  types: [
    {
      slot: number;
      type: PokeNameUrl;
    }
  ];
  weight: number;
}; */

export interface PokemonDetails {
  abilities: Ability[];
  base_experience: number;
  forms: Species[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: Species;
}

export interface HeldItem {
  item: Species;
  version_details: VersionDetail[];
}

export interface VersionDetail {
  rarity: number;
  version: Species;
}

export interface Move {
  move: Species;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Species;
  version_group: Species;
}

export interface GenerationV {
  'black-white': Sprites;
}

export interface GenerationIv {
  'diamond-pearl': Sprites;
  'heartgold-soulsilver': Sprites;
  platinum: Sprites;
}

export interface Versions {
  'generation-i': GenerationI;
  'generation-ii': GenerationIi;
  'generation-iii': GenerationIii;
  'generation-iv': GenerationIv;
  'generation-v': GenerationV;
  'generation-vi': { [key: string]: Home };
  'generation-vii': GenerationVii;
  'generation-viii': GenerationViii;
}

export interface Sprites {
  animated?: Sprites;
  back_default: string;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other?: Other;
  versions?: Versions;
}

export interface GenerationI {
  'red-blue': RedBlue;
  yellow: RedBlue;
}

export interface RedBlue {
  back_default: string | null;
  back_gray: string | null;
  back_transparent: string | null;
  front_default: string | null;
  front_gray: string | null;
  front_transparent: string | null;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
}

export interface Crystal {
  back_default: string | null;
  back_shiny: string | null;
  back_shiny_transparent: string | null;
  back_transparent: string | null;
  front_default: string | null;
  front_shiny: string | null;
  front_shiny_transparent: string | null;
  front_transparent: string | null;
}

export interface Gold {
  back_default: string | null;
  back_shiny: string | null;
  front_default: string | null;
  front_shiny: string | null;
  front_transparent?: string | null;
}

export interface GenerationIii {
  emerald: Emerald;
  'firered-leafgreen': Gold;
  'ruby-sapphire': Gold;
}

export interface Emerald {
  front_default: string | null;
  front_shiny: string | null;
}

export interface Home {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface GenerationVii {
  icons: DreamWorld;
  'ultra-sun-ultra-moon': Home;
}

export interface DreamWorld {
  front_default: string | null;
  front_female: string | null;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  'official-artwork': OfficialArtwork;
}

export interface OfficialArtwork {
  front_default: string | null;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}

export interface Type {
  slot: number;
  type: Species;
}
