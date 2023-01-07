import React, { FC } from 'react';
import { withBem } from '../../utils/bem';
import { usePokemon } from '../../lib/client/react-query/pokemon/usePokemon';
import { usePokeSpecie } from '../../lib/client/react-query/pokemon/usePokeSpecie';
import { useRouter } from 'next/router';
import PokeNav from '../../components/PokemonView/PokeNav';
import BasicData from '../../components/PokemonView/BasicData';
import { PokemonSpecie } from '../../types/models/PokemonSpecie';
/* import { PokemonDetails } from '../../types/models/Pokemon'; */

const PokeView: FC = () => {
  const b = withBem('poke-view');
  const router = useRouter();
  const id = String(router.query?.id);
  const { data } = usePokemon(id);
  const { data: specie } = usePokeSpecie(id);

  if (!data) return null;

  return (
    <div className={b('container')}>
      {' '}
      <PokeNav id={id} data={data} />
      <BasicData data={data} specie={specie as PokemonSpecie}></BasicData>
    </div>
  );
};

export default PokeView;
