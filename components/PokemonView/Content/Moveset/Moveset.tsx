import { UseQueryResult } from '@tanstack/react-query';
import { FC, useDeferredValue, useEffect } from 'react';
import { getMovesFromPokemonByGen } from '../../../../backend/scrapper/index.mjs';
import { MOVE_METHODS_ADQUIST } from '../../../../lib/client/constants';
import SuspenseWrapper from '../../../../lib/client/providers/SuspenseWrapper';

import { useMoveInfinityDetails } from '../../../../lib/client/react-query/pokemon/useMovesInfinity';
import { PokemonMoveset } from '../../../../model/pokemon/class/Movements';
import { ACTION_TYPES } from '../../../../model/table/enums/ActionsTable';
import { Move, PokemonDetails } from '../../../../types/models/Pokemon';
import { MovementDetails } from '../../../../types/models/PokemonMovement';
import { withBem } from '../../../../utils/bem';
import Button from '../../../Button/Button';
import { useMovementReducer } from '../../../Hooks/useMovements';
import Table2 from '../../../Table/TableMovement';

interface Props {
  currentGen: string;
  pokemon: PokemonDetails;
}

const Moves2: FC<Props> = ({ currentGen, pokemon }) => {
  const b = withBem('moveset');

  const { moves, games }: { moves: Move[]; games: string[] } = getMovesFromPokemonByGen(
    currentGen,
    pokemon
  );

  const { state, dispatch } = useMovementReducer(games);

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

  if (isLoading === true)
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
      </article>
    );

  if (isLoading === false) {
    const moveDetail = query.map((el) => el.data) as MovementDetails[];
    const moveset = new PokemonMoveset(moves, moveDetail, state);
    /* const deferredQuery = useDeferredValue(moveset); */

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
        <div className={b('moveset-container')}>
          {moveset.movesByMethod.map((moviments, id) => {
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
      </article>
    );
  }

  return <div>Something went wrong</div>;
};

export default Moves2;
