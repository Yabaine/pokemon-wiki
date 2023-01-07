import React, { FC, useCallback, useEffect, useState } from 'react';
import { withBem } from '../../../utils/bem';
import { Sprites } from '../../../types/models/Pokemon';
import PokemonCard from '../PokemonCard';
import { PokemonDetails } from '../../../types/models/Pokemon';
import { PokemonSpecie } from '../../../types/models/PokemonSpecie';
import { getGamePokedex } from '../../../utils';

type Props = {
  data: PokemonDetails;
  specie: PokemonSpecie;
};

type Handle = (url: string) => void;

/* type arrSprite = {
  [key: string]: string;
  showName: string;
  url: string;
}[];



type basicSprites = Omit<Sprites, 'versions'>; */

const BasicData: FC<Props> = ({ data, specie }) => {
  const b = withBem('basic-data');

  const {
    name,
    abilities,
    types,
    height,
    id,
    is_default,
    location_area_encounters,
    base_experience,
    forms,
    game_indices,
    held_items,
    moves,
    order,
    past_types,
    species,
    sprites,
    stats,
    weight,
  } = data;

  const type = types.map((type) => {
    return (
      <span key={type.type.name} className={b('type')}>
        {type.type.name}
      </span>
    );
  });

  const ability = abilities.map((ability) => {
    return (
      <span key={ability.ability.name} className={b('details')}>
        {ability.ability.name}
      </span>
    );
  });

  const game_indexs = specie.pokedex_numbers.map((entry, i) => {
    let [pokedex, group] = getGamePokedex(entry.pokedex.name);
    if (pokedex == undefined) return null;
    return (
      <tr key={i}>
        <td>{pokedex}</td>
        <td>{entry.pokedex.name}</td>
        <td>{entry.entry_number}</td>
      </tr>
    );
  });

  return (
    <>
      <div className={b('')}>
        <div className={b('data')}>
          <div className={b('title')}>
            <span className={b('num')}>#{data.id}</span>
            <span className={b('name')}> {data.name}</span>
          </div>
          <div className={b('info')}>
            <div className={b('entry')}>
              <span>Type:</span>
              {type}
            </div>
            <div className={b('entry')}>
              <span>Species: </span>
              <span className={b('detail')}> {species.name}</span>
            </div>
            <div className={b('entry')}>
              <span>Abilities: </span>
              {ability}
            </div>
            <div className={b('entry')}>
              <span>Height/Weight: </span>
              <span className={b('detail')}>
                {' '}
                {`${height / 10}m / ${weight / 10}kg `}
              </span>
            </div>
            <div className={b('entry')}>
              <span>First appearance: </span>
              <span className={b('detail')}>
                {/* games(game_indices[0].version.name) */}
              </span>
            </div>
          </div>
          {/*           https://stackoverflow.com/questions/72272821/tailwind-css-table-with-fixed-header-and-scrolling-tbody-vertically
           */}{' '}
          <table className="table-auto">
            <thead>
              <tr>
                <th>Game</th>
                <th>Pokedex</th>
                <th>Local Nº</th>
              </tr>
            </thead>
            <tbody>{game_indexs}</tbody>
          </table>
        </div>

        <PokemonCard name={data.name} sprites={data.sprites} />
      </div>
    </>
  );
};

export default BasicData;
