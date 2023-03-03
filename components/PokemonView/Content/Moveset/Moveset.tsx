import React, { FC, useEffect, useState } from 'react';
import { getMovesFromPokemonByGen } from '../../../../backend/scrapper/index.mjs';
import { MOVE_METHODS_ADQUIST } from '../../../../lib/client/constants';
import { useMoveDetails } from '../../../../lib/client/react-query/pokemon/useMovesDetails';
import { Move, PokemonDetails } from '../../../../types/models/Pokemon';
import { MovementDetails } from '../../../../types/models/PokemonMovement';
import { PokemonSpecie } from '../../../../types/models/PokemonSpecie';
import { withBem } from '../../../../utils/bem';
import Button from '../../../Button/Button';
import Table from '../../../Table/Table';

interface Props {
  currentGen: string;
  pokemon: PokemonDetails;
  specie: PokemonSpecie;
}

const Moves: FC<Props> = ({ currentGen, pokemon }) => {
  const b = withBem('moveset');

  interface MoveComplete extends Move {
    details?: MovementDetails;
  }

  const { moves, games }: { moves: Move[]; games: string[] } = getMovesFromPokemonByGen(
    currentGen,
    pokemon
  );

  const movesURl = moves.map((el) => el.move.url);
  const moveDetails = useMoveDetails(movesURl);

  const [currentGame, setGame] = useState(games[0]);

  const handleClick = (game: string) => {
    setGame(game);
  };

  useEffect(() => {
    setGame(games[0]);
  }, [currentGen]);

  class Moveset {
    moves: MoveComplete[];
    games: string[];
    constructor(moves: MoveComplete[], games: string[]) {
      this.moves = moves;
      this.games = games;
    }

    getMovesFilteredByType(type: string) {
      return this.moves
        .map((move: MoveComplete) => {
          return {
            ...move,
            details: moveDetails.find((el) => el.name === move.move.name),
            version_group_details: move.version_group_details.filter(
              (el) => el.move_learn_method.name === type
            ),
          };
        })
        .filter((el) => el.version_group_details.length > 0);
    }
  }

  class MovesTable {
    moveset: Moveset;
    movesByType: MoveComplete[][];
    table: JSX.Element;
    constructor(moveset: Moveset) {
      this.moveset = moveset;
      this.movesByType = this.getMovesByTypes();
      this.table = this.getTable();
    }

    getMovesByTypes() {
      return MOVE_METHODS_ADQUIST.map((tipo) => {
        return this.moveset.getMovesFilteredByType(tipo);
      });
    }

    /* rowTable(moves: MoveComplete[]) {
      for (let i = 0; i < moves.length; i++) {
        return (
          <tr key={i + 'i'}>
            {moves[i].version_group_details.map((el, id: number) => {
              if (el.version_group.name === currentGame) {
                return (
                  <React.Fragment key={moves[i].move.name}>
                    <td className={b('machine-name')}>{moves[i].move.name}</td>
                    {el.move_learn_method.name == 'level-up' && (
                      <td>{el.level_learned_at}</td>
                    )}
                    <td>{`Power ${moves[i].details?.power}`} </td>
                  </React.Fragment>
                );
              }
            })}
          </tr>
        );
      }

  
    } */

    getTable() {
      return (
        <div className={b('moves-container')}>
          {this.movesByType.map((moves, id) => {
            if (moves.length === 0) return null;

            return (
              <div key={MOVE_METHODS_ADQUIST[id]}>
                <h2 className={b('title')}>{MOVE_METHODS_ADQUIST[id]}</h2>
                <Table>
                  <tr>
                    <th>Move</th>
                    {MOVE_METHODS_ADQUIST[id] === 'level-up' && <th>Level</th>}
                    <th>Power</th>
                    <th>Type</th>
                    <th>Class</th>
                  </tr>
                  {moves.map((item, id) => {
                    return (
                      <tr key={id + 'i'} className={b('moves')}>
                        {item.version_group_details.map((el, id: number) => {
                          if (el.version_group.name === currentGame) {
                            return (
                              <React.Fragment key={item.move.name}>
                                <td>{item.move.name.replace(/-/g, ' ')}</td>
                                {el.move_learn_method.name == 'level-up' && (
                                  <td>{el.level_learned_at}</td>
                                )}
                                <td>
                                  {item.details?.power == null
                                    ? '/'
                                    : item.details?.power}{' '}
                                </td>
                                <td>{item.details?.type.name}</td>
                                <td>{item.details?.damage_class.name}</td>
                              </React.Fragment>
                            );
                          }
                        })}
                      </tr>
                    );
                  })}
                </Table>
              </div>
            );
          })}
        </div>
      );
    }
  }

  const moveset = new Moveset(moves, games);
  const movesTable = new MovesTable(moveset);

  console.log(movesTable.movesByType);

  return (
    <article className={'moveset'}>
      <div className={b('games')}>
        {games.map((game) => {
          return (
            <Button key={game} className="game" onClick={() => handleClick(game)}>
              {game}
            </Button>
          );
        })}
      </div>
      <div className={b('moveset-container')}>{movesTable.table}</div>
    </article>
  );
};

export default Moves;
