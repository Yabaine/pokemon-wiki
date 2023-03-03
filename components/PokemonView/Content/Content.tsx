import { FC } from 'react';
import { useCurrentGen, useMainTab } from '../../../lib/client/providers/Zustand';
import { TypeGroupGenPokeDX } from '../../../types/models/GroupGenPokeDX';
import { PokemonDetails } from '../../../types/models/Pokemon';
import { PokemonSpecie } from '../../../types/models/PokemonSpecie';
import { withBem } from '../../../utils/bem';
import General from './General/General';
import Location from './Location/Location';
import Moves2 from './Moveset/Moveset2';
import Stats from './Stats';

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
      content = <Moves2 currentGen={currentGen} pokemon={pokemon} />;
      break;
    default:
      content = <General currentGen={currentGen} specie={specie} pokemon={pokemon} />;
      break;
  }

  return <div className={b('')}>{content}</div>;
};

export default Content;
