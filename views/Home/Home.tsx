import React, { FC } from 'react';
import { withBem } from '../../utils/bem';
import PokemonList from '../../components/PokemonList';

const HomeView: FC = () => {
  const b = withBem('home');

  return (
    <div className={b()}>
      <section className={b('container')}>
        <PokemonList />
      </section>
    </div>
  );
};

export default HomeView;
