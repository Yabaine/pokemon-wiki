import React, { FC } from 'react';
import { withBem } from '../../../utils/bem';
import General from './General/General2';
import Stats from './Stats';
import Location from './Location/Location';
import Moveset from './Moveset/Moveset';
import { useCurrentGen, useMainTab } from '../../../lib/client/providers/Zustand';
import { PokemonSpecie } from '../../../types/models/PokemonSpecie';
import { PokemonDetails } from '../../../types/models/Pokemon';
import { TypeGroupGenPokeDX } from '../../../types/models/GroupGenPokeDX';

type Props = {
  specie: PokemonSpecie;
  pokemon: PokemonDetails;
  mapped: TypeGroupGenPokeDX;
};

const Content: FC<Props> = ({ pokemon, specie, mapped }) => {
  const b = withBem('content');

  const currentGen = useCurrentGen((state) => state.currentGen);
  const activeTab = useMainTab((state) => state.tab);

  let content: JSX.Element;

  switch (activeTab) {
    case 'general':
      content = <General currentGen={currentGen} specie={specie} pokemon={pokemon} />;
      break;
    case 'stats':
      content = <Stats specie={specie} pokemon={pokemon} />;
      break;
    case 'location':
      content = (
        <Location
          currentGen={currentGen}
          locationUrl={pokemon.location_area_encounters}
          mapped={mapped}
        />
      );
      break;
    case 'moveset':
      content = <Moveset currentGen={currentGen} specie={specie} pokemon={pokemon} />;
      break;
    default:
      content = <General currentGen={currentGen} specie={specie} pokemon={pokemon} />;
      break;
  }

  return <div className={b('')}>{content}</div>;
};

export default Content;
