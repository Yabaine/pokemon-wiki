import { MOVE_METHODS_ADQUIST } from '../../../lib/client/constants';
import { InitialState } from '../../table/interfaces/ActionsTable';
import { Move } from '../interfaces/Pokemon';
import { MovementDetails } from '../interfaces/PokemonMovement';

interface MoveComplete extends Move {
  details: MovementDetails;
}

export class PokemonMoveset {
  moves: Move[] | MoveComplete[];
  moveDetail: MovementDetails[];
  state: InitialState;
  movesByMethod: MoveComplete[][];
  constructor(moves: Move[], moveDetail: MovementDetails[], state: InitialState) {
    this.moves = moves;
    this.moveDetail = moveDetail;
    this.state = state;
    this.movesByMethod = this.getMovesByMethod();
  }

  getMovesFilteredByMethodAndGame(method: string) {
    return this.moves
      .slice(0, this.state.size)
      .map((move: Move) => {
        return {
          ...move,
          details: this.getDetails(move),
          version_group_details: move.version_group_details.filter(
            (el) =>
              el.move_learn_method.name === method &&
              el.version_group.name === this.state.currentGame
          ),
        };
      })
      .filter((el) => el.version_group_details.length > 0) as MoveComplete[];
  }

  getDetails(move: Move) {
    return this.moveDetail.find((el) => el.name === move.move.name);
  }

  getMovesByMethod(): MoveComplete[][] {
    return MOVE_METHODS_ADQUIST.map((method) => {
      return this.getMovesFilteredByMethodAndGame(method);
    });
  }
}
