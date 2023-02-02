import React, { FC, useCallback } from 'react';
import { withBem } from '../../../../utils/bem';
import { PokemonSpecie } from '../../../../types/models/PokemonSpecie';
import { PokemonDetails } from '../../../../types/models/Pokemon';
import { useEvolutions } from '../../../../lib/client/react-query/pokemon/Nested';
import { useSeveralPokemon } from '../../../../lib/client/react-query/pokemon/useSeveralPokemon';
import { Evolve } from '../../../../lib/client/react-query/pokemon/useEvolutions';
import Image from 'next/image';
import Link from 'next/dist/client/link';
import { toString } from '../../../../lib/client/imageLoaders';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';

interface Props {
  pokemon: PokemonDetails;
  specie: PokemonSpecie;
}

type item = {
  name: string;
  url: string;
};

interface Evol {
  key: string;
  value: number | item | null | string;
}

interface To {
  [key: string]: string | number | any | null;
}

const Nested: FC<Props> = ({ pokemon, specie }) => {
  const b = withBem('general');
  let evolutionLine: JSX.Element | null = null;
  let reg = /\/(\d+)\//;
  let duplicate = false;

  // No hay ningun propiedad que nos indique si el pokemon tiene evolucion o no
  // por lo que tenemos que hacer una validacion/llamada para saber si tiene evolucion o no
  const evolutionChainId = specie.evolution_chain.url.match(reg)!?.[1];
  const { data, pokeID } = useEvolutions(evolutionChainId);

  let pokemonEvol = useSeveralPokemon(pokeID);
  /*  for (let i = 0; i < pokemonEvol.length; i++) {
      if (pokemonEvol[i] !== undefined) {
        evolutions[i].sprite = pokemonEvol[i].sprites.front_default;
      }
    } */

  const filter = useCallback(
    (chain: any) => {
      console.log(chain);
      const keyify = (obj: any): any =>
        Object.keys(obj).reduce((res, el: any): any => {
          console.log(typeof el);

          if (el == 'evolves_to' && obj[el] !== null) {
            console.log('Encontrado objeto');
            obj[el].map((evolve: any) => {
              console.log(evolve.species.name);
            });
            return [...res, ...keyify(obj[el])];
          }
          if (el === 'species') {
            console.log(obj[el].name);
            /* arrEvol.push({ showName: obj[el] }); */
          }

          return res;
        }, []);
      keyify(chain);
    },
    [data]
  );

  filter(data);

  evolutionLine = (
    <div className={b('evolution-line')}>
      <h3>
        <strong>Evolution Line</strong>
      </h3>
      {/* <div className={b('poke-line')}>
        <>
          {data.species.name}
          {data.evolves_to.map((evolve: any, i: number) => {
            return (
              <div key={i}>
                <div className={b('arrow-container')}>
                  <span>{evolve.species.name}</span>
                  <div className={b('arrows')}>
                    <div className={b('arrow-right')}> {<FaArrowRight />}</div>
                    <div className={b('arrow-down')}> {<FaArrowDown />}</div>
                  </div>
                </div>
              </div>
            );
          })}
          {data.evolves_to.map((evolve: any, i: number) => {
            return evolve.evolves_to.map((evolve2: any, i: number) => {
              return (
                <div key={i}>
                  <div className={b('arrow-container')}>
                    <span>{evolve2.species.name}</span>
                    <div className={b('arrows')}>
                      <div className={b('arrow-right')}> {<FaArrowRight />}</div>
                      <div className={b('arrow-down')}> {<FaArrowDown />}</div>
                    </div>
                  </div>
                </div>
              );
            });
          })}
        </>
      </div> */}
    </div>
  );

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

  return (
    <div className={'general'}>
      {/* {abilities} */}
      {evolutionLine}
    </div>
  );
};

export default Nested;
