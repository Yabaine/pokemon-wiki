import { MovementDetails } from '../../../types/models/PokemonMovement';
import { MOVE_DETAIL } from '../enums/PokemonMovement';
import { POKEMON_TYPE } from '../enums/PokemonType';
import { Move } from './Pokemon';

export interface MoveData {
  [MOVE_DETAIL.MOVE]: string;
  [MOVE_DETAIL.TYPE]: POKEMON_TYPE;
  [MOVE_DETAIL.CLASS]: string;
}

export interface LevelUp extends MoveData {
  [MOVE_DETAIL.LEVEL]: number;
}

export interface MoveComplete extends Move {
  details: MovementDetails;
}
