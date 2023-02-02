import React, { FC } from 'react';
import { withBem } from '../../utils/bem';
import { TypeGameObject } from '../../lib/client/react-query/pokemon/usePokemonLocation';

type Props = {
  games: TypeGameObject;
  setMain: React.Dispatch<React.SetStateAction<string>>;
  gameMain: string;
};

const Button: FC<Props> = ({ games, setMain, gameMain }) => {
  const b = withBem('button');

  const handleClick = (game: string) => {
    setMain(game);
  };

  let button = Object.entries(games).map(([KEY, value]) => {
    return (
      <button
        key={KEY}
        disabled={value.length == 0}
        onClick={() => handleClick(KEY)}
        role={'button'}
        className={b(`button${gameMain == KEY ? '-main' : ''}`)}
      >
        {KEY}
      </button>
    );
  });

  return <>{button}</>;
};

export default Button;
