import { useRouter } from 'next/router';
import { FC } from 'react';
import Navbar from '../../components/Navbar';
import BasicData from '../../components/PokemonView/BasicData';
import Content from '../../components/PokemonView/Content';
import Labels from '../../components/PokemonView/Labels';
import PokeNav from '../../components/PokemonView/PokeNav';
import Tabs from '../../components/Tabs';
import { PokemonTabs } from '../../lib/client/constants';
import SuspenseWrapper from '../../lib/client/providers/SuspenseWrapper';
import { mapaDataCache } from '../../lib/client/react-query/pokemon/getMapaData';
import { usePokemon } from '../../lib/client/react-query/pokemon/usePokemon';
import { usePokeSpecie } from '../../lib/client/react-query/pokemon/usePokeSpecie';
import { TypeGroupGenPokeDX } from '../../types/models/GroupGenPokeDX';
import { withBem } from '../../utils/bem';

const PokeView: FC = () => {
  const b = withBem('poke-view');
  const router = useRouter();
  const id = String(router.query?.id);
  const pokemon = usePokemon(id);
  const specie = usePokeSpecie(id);
  const mapped = mapaDataCache();

  if (!pokemon || !specie || !mapped) return null;

  return (
    <div className={b('')}>
      <Navbar baseGen={specie.generation.name} pokemon={pokemon} mapped={mapped} />
      <div className={b('container')}>
        {/* <Labels baseGen={specie.generation.name} pokemon={pokemon} mapped={mapped}></Labels> */}
        <PokeNav id={id} data={pokemon} />
        <BasicData data={pokemon} specie={specie} mapped={mapped} />
        <Tabs tabs={PokemonTabs} />
        <SuspenseWrapper loaderType="item">
          <Content specie={specie} pokemon={pokemon} mapped={mapped}></Content>
        </SuspenseWrapper>
      </div>
    </div>
  );
};

export default PokeView;
