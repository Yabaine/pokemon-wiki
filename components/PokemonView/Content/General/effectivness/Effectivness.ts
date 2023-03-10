import { TYPES_DAMAGES } from '../../../../../model/pokemon/constants/TypesDamages';
import { POKEMON_TYPE } from '../../../../../model/pokemon/enums/PokemonType';

type Tipo = {
  [key in POKEMON_TYPE]: number;
};

type PokemonTypes = POKEMON_TYPE;

enum MULTIPLIER_RATES {
  '(x4) Double effective' = 4,
  '(x2) Effective' = 2,
  '(x1) Normal' = 1,
  '(/2) Resisted' = 0.5,
  '(/4) Double Resisted' = 0.25,
  '(0) Null' = 0,
}

enum MULTIPLIER_NAMES {
  '(x4) Double effective' = '(x4) Double effective',
  '(x2) Effective' = '(x2) Effective',
  '(x1) Normal' = '(x1) Normal',
  '(/2) Resisted' = '(/2) Resisted',
  '(/4) Double Resisted' = '(/4) Double Resisted',
  '(0) Null' = '(0) Null',
}

type MultiplierType = {
  [key in MULTIPLIER_NAMES]: POKEMON_TYPE[];
};

export class EffectivnesTypesClass {
  baseMultiplier: Tipo;
  grade: MultiplierType;
  /*     currentPokemonType: POKEMON_TYPE[]; */
  types: POKEMON_TYPE[];
  constructor(types: POKEMON_TYPE[]) {
    this.baseMultiplier = {
      [POKEMON_TYPE.NORMAL]: 1,
      [POKEMON_TYPE.FIRE]: 1,
      [POKEMON_TYPE.WATER]: 1,
      [POKEMON_TYPE.GRASS]: 1,
      [POKEMON_TYPE.ELECTRIC]: 1,
      [POKEMON_TYPE.ICE]: 1,
      [POKEMON_TYPE.FIGHTING]: 1,
      [POKEMON_TYPE.POISON]: 1,
      [POKEMON_TYPE.GROUND]: 1,
      [POKEMON_TYPE.FLYING]: 1,
      [POKEMON_TYPE.PSYCHIC]: 1,
      [POKEMON_TYPE.BUG]: 1,
      [POKEMON_TYPE.ROCK]: 1,
      [POKEMON_TYPE.GHOST]: 1,
      [POKEMON_TYPE.DRAGON]: 1,
      [POKEMON_TYPE.DARK]: 1,
      [POKEMON_TYPE.STEEL]: 1,
      [POKEMON_TYPE.FAIRY]: 1,
    };

    this.grade = {
      [MULTIPLIER_NAMES['(x4) Double effective']]: [],
      [MULTIPLIER_NAMES['(x2) Effective']]: [],
      [MULTIPLIER_NAMES['(x1) Normal']]: [],
      [MULTIPLIER_NAMES['(/2) Resisted']]: [],
      [MULTIPLIER_NAMES['(/4) Double Resisted']]: [],
      [MULTIPLIER_NAMES['(0) Null']]: [],
    };

    this.types = types;
    this.sortEffectivness();
  }

  sortEffectivness() {
    this.types.forEach((type) => {
      for (const [key, value] of Object.entries(TYPES_DAMAGES)) {
        this.baseMultiplier[key as PokemonTypes] *= value[type];
      }
    });
    for (const [key, value] of Object.entries(this.baseMultiplier)) {
      this.grade[MULTIPLIER_RATES[value] as keyof typeof MULTIPLIER_RATES].push(
        key as PokemonTypes
      );
    }
  }
}
