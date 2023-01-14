import React, { FC, useCallback, useEffect, useState } from 'react';
import { withBem } from '../../../utils/bem';
import { Sprites } from '../../../types/models/Pokemon';
import PokemonCard from '../PokemonCard';
import { PokemonDetails } from '../../../types/models/Pokemon';
import { PokemonSpecie } from '../../../types/models/PokemonSpecie';
import { getGameFromPokedex } from '../../../backend/scrapper/index.mjs';
import { MainPokedex } from '../../../lib/client/constants';
import { GroupGenPokeDX } from '../../../lib/client/constants';

type Props = {
  data: PokemonDetails;
  specie: PokemonSpecie;
  mapped: GroupGenPokeDX;
};

type Handle = (url: string) => void;

/* type arrSprite = {
  [key: string]: string;
  showName: string;
  url: string;
}[];


type basicSprites = Omit<Sprites, 'versions'>; */

//Regex remove all between first 3 letter and after a '-' is found
const regex = new RegExp(/(?<=-).*/);

const isMainPokedex = (pokedex: string) => {
  return MainPokedex.includes(pokedex);
};

const BasicData: FC<Props> = ({ data, specie, mapped }) => {
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

  const game_indexes = specie.pokedex_numbers.map((entry, i) => {
    let mainGame = isMainPokedex(entry.pokedex.name);

    if (!mainGame) {
      return null;
    }

    let games = getGameFromPokedex(entry.pokedex.name, mapped);
    if (games == undefined) return null;

    return (
      <tr className={b('table-items')} key={i}>
        <td className={b('game-indexes')}>{games}</td>
        <td className={b('type')}>{entry.pokedex.name}</td>
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
              <span className={b('detail')}>{`GEN ${regex.exec(
                specie.generation.name
              )}`}</span>
            </div>
          </div>
          {/*           https://stackoverflow.com/questions/72272821/tailwind-css-table-with-fixed-header-and-scrolling-tbody-vertically
           */}{' '}
          <div className={b('table-auto')}>
            <table className={'w-full'}>
              <thead className={b('thead')}>
                <tr>
                  <th className={'p-2'}>Games</th>
                  <th>Pokedex</th>
                  <th>Local Nº</th>
                </tr>
              </thead>
              <tbody className={b('tbody')}>{game_indexes}</tbody>
            </table>
          </div>
        </div>

        <PokemonCard name={data.name} sprites={data.sprites} />
      </div>
    </>
  );
};

export default BasicData;
