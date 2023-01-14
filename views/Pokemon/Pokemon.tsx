import React, { FC, useEffect } from 'react';
import { withBem } from '../../utils/bem';
import { usePokemon } from '../../lib/client/react-query/pokemon/usePokemon';
import { usePokeSpecie } from '../../lib/client/react-query/pokemon/usePokeSpecie';
import { useRouter } from 'next/router';
import PokeNav from '../../components/PokemonView/PokeNav';
import BasicData from '../../components/PokemonView/BasicData';
import Tabs from '../../components/Tabs';
import Content from '../../components/PokemonView/Content';
import { PokemonSpecie } from '../../types/models/PokemonSpecie';
import { mapaDataCache } from '../../lib/client/react-query/pokemon/getMapaData';
import { GroupGenPokeDX } from '../../lib/client/constants';
import { PokemonTabs } from '../../lib/client/constants';

const PokeView: FC = () => {
  const b = withBem('poke-view');
  const router = useRouter();
  const id = String(router.query?.id);
  const pokemon = usePokemon(id);
  const specie = usePokeSpecie(id);
  const mapped = mapaDataCache();

  if (!pokemon || !specie) return null;

  return (
    <div className={b('container')}>
      <PokeNav id={id} data={pokemon} />
      <BasicData data={pokemon} specie={specie} mapped={mapped as GroupGenPokeDX} />
      <Tabs tabs={PokemonTabs} />
      <Content specie={specie} pokemon={pokemon}></Content>
    </div>
  );
};

export default PokeView;
