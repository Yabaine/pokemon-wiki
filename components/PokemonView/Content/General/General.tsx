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

  const evolutions: JSX.Element = (
    <div>
      {specie.evolves_from_species ? (
        <div>
          <h3>Evolution from:</h3>
          <p>{specie.evolves_from_species.name}</p>
        </div>
      ) : null}
      {specie.evolution_chain ? (
        <div>
          <h3>Evolution chain:</h3>
          <p>{specie.evolution_chain.url}</p>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className={b('container')}>
      {abilities}
      {evolutions}
    </div>
  );
};

export default General;
