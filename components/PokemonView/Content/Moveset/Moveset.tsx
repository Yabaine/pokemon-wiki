import React, { FC, useState, useEffect } from 'react';
import { withBem } from '../../../../utils/bem';
import { PokemonSpecie } from '../../../../types/models/PokemonSpecie';
import { PokemonDetails } from '../../../../types/models/Pokemon';
import { getMovesFromPokemonByGen } from '../../../../backend/scrapper/index.mjs';
import { TipoMovimiento } from '../../../../lib/client/constants';
import { Move } from '../../../../types/models/Pokemon';

interface Props {
  currentGen: string;
  pokemon: PokemonDetails;
  specie: PokemonSpecie;
}

type MoveTypes = {
  type: 'machine' | 'level-up' | 'egg' | 'tutor';
};

const Stats: FC<Props> = ({ currentGen, pokemon }) => {
  const b = withBem('moveset');

  const [currentGame, setGame] = useState('');

  const { moves, games } = getMovesFromPokemonByGen(currentGen, pokemon);

  const handleClick = (game: string) => {
    setGame(game);
  };

  useEffect(() => {
    if (games.includes(currentGame)) {
      return;
    } else {
      setGame(games[0]);
    }
  }, [games, currentGen]);

  const moveType = (type: string) => {
    return moves
      .map((move: Move) => {
        return {
          ...move,
          version_group_details: move.version_group_details.filter(
            (el) => el.move_learn_method.name === type
          ),
        };
      })
      .filter((el) => el.version_group_details.length > 0);
  };

  const MoveType: FC<MoveTypes> = ({ type }) => {
    let moves = moveType(type);
    console.log(moves);
    if (moves.length == 0) return null;
    return (
      <div className={b('moves-container')}>
        <h2 className={b('title')}>{type}</h2>
        <div className={b('moves')}>
          {moves.map((item, id) => {
            return (
              <div key={id + 'i'}>
                {item.version_group_details.map((el, id: number) => {
                  if (el.version_group.name === currentGame) {
                    return (
                      <div key={id} className={b('machine-name')}>
                        {item.move.name}
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <article className={'moveset'}>
      <div className={b('games')}>
        {games.map((game) => {
          return (
            <button key={game} className={b('game')} onClick={() => handleClick(game)}>
              {game}
            </button>
          );
        })}
      </div>
      <div className={b('moveset-container')}>
        {/* Ñ2  */}
        {TipoMovimiento.map((tipo: any) => {
          return <MoveType type={tipo}></MoveType>;
        })}
      </div>
    </article>
  );
};

export default Stats;
