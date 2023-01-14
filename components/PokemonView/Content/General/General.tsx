import React, { FC } from 'react';
import { withBem } from '../../../../utils/bem';
import { PokemonSpecie } from '../../../../types/models/PokemonSpecie';
import { PokemonDetails } from '../../../../types/models/Pokemon';

interface Props {
  pokemon: PokemonDetails;
  specie: PokemonSpecie;
}

const General: FC<Props> = ({ pokemon, specie }) => {
  const b = withBem('general');

  const abilities: JSX.Element = (
    <div>
      {pokemon.abilities.map((ability) => {
        return (
          <div key={ability.ability.name}>
            <h3>
              {ability.ability.name}
              <span>{ability.is_hidden ? ' (hidden)' : ''}</span>
            </h3>
            <p>{ability.ability.url}</p>
          </div>
        );
      })}
    </div>
  );

  return <div className={b('container')}>{abilities}</div>;
};

export default General;
