import React, { FC } from 'react';
import { withBem } from '../../../../utils/bem';
import { StatsVariables } from '../../../../lib/client/constants';
import { PokemonSpecie } from '../../../../types/models/PokemonSpecie';
import { PokemonDetails } from '../../../../types/models/Pokemon';

interface Props {
  pokemon: PokemonDetails;
  specie: PokemonSpecie;
}

const Stats: FC<Props> = ({ pokemon, specie }) => {
  const b = withBem('stats');

  /* Ñ4 */
  const colorPicker = (percentage: number) => {
    if (percentage < 10) {
      return 'hsla(0, 57%, 54%, 1)';
    } else if (percentage < 25) {
      return 'hsla(30, 87%, 60%, 1)';
    } else if (percentage < 35) {
      return 'hsla(52, 100%, 55%, 1)';
    } else if (percentage < 60) {
      return 'hsla(119, 75%, 60%, 1)';
    } else if (percentage < 80) {
      return 'hsla(119, 75%, 42%, 1)';
    } else {
      return 'hsla(119, 75%, 75%, 1)';
    }
  };

  /* const stats: JSX.Element = (
    <div className={b('stats')}>
      {StatsVariables.map((stat, i) => {
        return (
          <div>
            <strong>{`${stat}:`}</strong>
            <span>{pokemon.stats[i].base_stat}</span>
          </div>
        );
      })}
    </div>
  ); */

  const statsTable: JSX.Element = (
    <table className={b('table')}>
      <thead className={b('thead')}>
        <tr className="flex flex-col gap-2">
          {StatsVariables.map((stat) => {
            return <th>{stat}</th>;
          })}
        </tr>
      </thead>
      <tbody className={b('tbody')}>
        {pokemon.stats.map((stat) => (
          <tr className={b('tr')} key={stat.stat.name}>
            <td className="w-10 text-right">{stat.base_stat}</td>
            <td className={b('bar')}>
              <div
                style={{
                  width: `${(stat.base_stat / 170) * 100}%`,
                  backgroundColor: `${colorPicker((stat.base_stat / 255) * 100)}`,
                }}
              ></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <article className={'stats'}>
      <div className="other-stats">
        <div>
          <strong>EV yield:</strong>
          <span></span>
        </div>
        <div>
          <strong>Capture rate:</strong>
          <span>{specie.capture_rate}</span>
        </div>
        <div>
          <strong>Base happiness:</strong>
          <span>{specie.base_happiness}</span>
        </div>
        <div>
          <strong>Base exp:</strong>
          <span>{pokemon.base_experience}</span>
        </div>
        <div>
          <strong>Exp. at lvl 100:</strong>
          <span>{}</span>
        </div>
        <div>
          <strong>Grow rate:</strong>
          <span>{specie.growth_rate.name}</span>
        </div>
      </div>
      {statsTable}
    </article>
  );
};

export default Stats;
