import { UseQueryResult } from '@tanstack/react-query';
import { FC, useEffect, useReducer } from 'react';
import { getMovesFromPokemonByGen } from '../../../../backend/scrapper/index.mjs';
import { MOVE_METHODS_ADQUIST } from '../../../../lib/client/constants';
import { useMoveInfinityDetails } from '../../../../lib/client/react-query/pokemon/useMovesInfinity';
import { MovementDetails } from '../../../../model/pokemon/interfaces/PokemonMovement.js';
import { Move, PokemonDetails } from '../../../../types/models/Pokemon';

import { withBem } from '../../../../utils/bem';
import Button from '../../../Button/Button';
import Table2 from '../../../Table/TableMovement';

interface Props {
  currentGen: string;
  pokemon: PokemonDetails;
}

const Moves2: FC<Props> = ({ currentGen, pokemon }) => {
  const b = withBem('moveset');

  interface MoveComplete extends Move {
    details: MovementDetails;
  }

  const { moves, games }: { moves: Move[]; games: string[] } = getMovesFromPokemonByGen(
    currentGen,
    pokemon
  );

  interface InitialState {
    size?: number;
    loading?: boolean;
    currentGame?: string;
  }

  const initialState: InitialState = { size: 20, loading: true, currentGame: games[0] };

  enum ACTION_TYPES {
    SHOW_MORE = 'show_more',
    CURRENT_GAME = 'current_game',
    LOADING = 'loading',
    SIZE = 'size',
  }

  type Actions =
    | { type: ACTION_TYPES.SHOW_MORE; payload: number }
    | { type: ACTION_TYPES.CURRENT_GAME; payload: string }
    | { type: ACTION_TYPES.LOADING; payload: boolean }
    | { type: ACTION_TYPES.SIZE };

  function reducer(state: InitialState, actions: Actions): InitialState {
    switch (actions.type) {
      case ACTION_TYPES.SHOW_MORE:
        return {
          ...state,
          size: actions.payload,
        };
      case ACTION_TYPES.CURRENT_GAME:
        return {
          ...state,
          currentGame: actions.payload,
        };
      case ACTION_TYPES.LOADING:
        return {
          ...state,
          loading: actions.payload,
        };
      case ACTION_TYPES.SIZE:
        return {
          ...state,
          size: 20,
        };
      default:
        throw Error('Unknown action.');
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // regex keep only numbers
  const regex = /https:\/\/pokeapi.co\/api\/v2\/move\/(?<movement>\d*)/;

  // Ñ1

  const movesURl = moves.map((el) => el.move.url.match(regex)?.groups?.movement || '');

  const {
    query,
    isLoading,
  }: {
    query: UseQueryResult<MovementDetails, unknown>[];
    isLoading: boolean;
  } = useMoveInfinityDetails(state.size, movesURl);

  const changeGame = (game: string) => {
    dispatch({ type: ACTION_TYPES.CURRENT_GAME, payload: game });
  };

  const showMore = () => {
    dispatch({ type: ACTION_TYPES.SHOW_MORE, payload: movesURl.length });
  };

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.CURRENT_GAME, payload: games[0] });
  }, [currentGen]);

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.SIZE });
  }, [pokemon.name]);

  class Moveset {
    moves: Move[] | MoveComplete[];
    games: string[];
    moveDetail: MovementDetails[];
    constructor(moves: Move[], games: string[], moveDetail: MovementDetails[]) {
      this.moves = moves;
      this.games = games;
      this.moveDetail = moveDetail;
    }

    getMovesFilteredByMethodAndGame(method: string) {
      return this.moves
        .slice(0, state.size)
        .map((move: Move) => {
          return {
            ...move,
            details: this.getDetails(move),
            version_group_details: move.version_group_details.filter(
              (el) =>
                el.move_learn_method.name === method &&
                el.version_group.name === state.currentGame
            ),
          };
        })
        .filter((el) => el.version_group_details.length > 0) as MoveComplete[];
    }

    getDetails(move: Move) {
      return this.moveDetail.find((el) => el.name === move.move.name);
    }
  }

  class MovesTable {
    moveset: Moveset;
    movesByMethod: MoveComplete[][];
    table: JSX.Element;
    constructor(moveset: Moveset) {
      this.moveset = moveset;
      this.movesByMethod = this.getMovesByMethod();
      this.table = this.getTable();
    }

    getMovesByMethod(): MoveComplete[][] {
      return MOVE_METHODS_ADQUIST.map((method) => {
        return this.moveset.getMovesFilteredByMethodAndGame(method);
      });
    }

    getTable() {
      return (
        <div className={b('moveset-container')}>
          {this.movesByMethod.map((moviments, id) => {
            if (moviments.length === 0) return null;
            return (
              <div key={MOVE_METHODS_ADQUIST[id]}>
                <h2 className={b('title')}>{MOVE_METHODS_ADQUIST[id]}</h2>
                <Table2
                  datos={moviments}
                  showMore={showMore}
                  height={movesURl.length <= state.size! ? 'auto' : 'small'}
                  method={MOVE_METHODS_ADQUIST[id]}
                ></Table2>
              </div>
            );
          })}
        </div>
      );
    }
  }

  if (isLoading === true)
    return (
      <div className={b('games')}>
        {games.map((game) => {
          return (
            <Button key={game} className="game" onClick={() => changeGame(game)}>
              {game}
            </Button>
          );
        })}
      </div>
    );
  if (isLoading === false) {
    const moveDetail = query.map((el) => el.data) as MovementDetails[];
    const moveset = new Moveset(moves, games, moveDetail);
    const movesTable = new MovesTable(moveset);

    return (
      <article className={'moveset'}>
        <div className={b('games')}>
          {games.map((game) => {
            return (
              <Button key={game} className="game" onClick={() => changeGame(game)}>
                {game}
              </Button>
            );
          })}
        </div>
        {movesTable.table}
      </article>
    );
  }

  return <div>Something went wrong</div>;
};

export default Moves2;
