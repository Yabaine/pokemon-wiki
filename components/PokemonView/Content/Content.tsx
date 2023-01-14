import React, { FC } from 'react';
import { withBem } from '../../../utils/bem';
import General from './General';
import Stats from './Stats';
import { useMainTab } from '../../../lib/client/providers/Zustand';
import { PokemonSpecie } from '../../../types/models/PokemonSpecie';
import { PokemonDetails } from '../../../types/models/Pokemon';

type Props = {
  specie: PokemonSpecie;
  pokemon: PokemonDetails;
};

const Content: FC<Props> = ({ pokemon, specie }) => {
  const b = withBem('general');

  const activeTab = useMainTab((state) => state.tab);

  let content;

  switch (activeTab) {
    case 'general':
      content = <General specie={specie} pokemon={pokemon} />;
      break;
    case 'stats':
      content = <Stats />;
      break;
    default:
      content = <General specie={specie} pokemon={pokemon} />;
      break;
  }

  return <div className={b()}>{content}</div>;
};

export default Content;
