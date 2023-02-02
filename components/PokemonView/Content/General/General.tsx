import React, { FC } from 'react';
import { withBem } from '../../../../utils/bem';
import { PokemonSpecie } from '../../../../types/models/PokemonSpecie';
import { PokemonDetails } from '../../../../types/models/Pokemon';
import { useEvolutions } from '../../../../lib/client/react-query/pokemon/useEvolutions';
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

const General: FC<Props> = ({ pokemon, specie }) => {
  const b = withBem('general');
  let evolutionLine: JSX.Element | null = null;
  let reg = /\/(\d+)\//;
  let pokeID: string[] = [];
  let duplicate = false;

  // No hay ningun propiedad que nos indique si el pokemon tiene evolucion o no
  // por lo que tenemos que hacer una validacion/llamada para saber si tiene evolucion o no
  const evolutionChainId = specie.evolution_chain.url.match(reg)!?.[1];
  const evolutions = useEvolutions(evolutionChainId);

  const uniqueValues = new Set(evolutions.map((v) => v.name));

  if (uniqueValues.size < evolutions.length) {
    duplicate = true;
  }

  evolutions.map((poke) => {
    pokeID.push(poke.url.match(reg)!?.[1]);
  });

  let pokemonEvol = useSeveralPokemon(pokeID);

  if (evolutions.length > 0) {
    for (let i = 0; i < pokemonEvol.length; i++) {
      if (pokemonEvol[i] !== undefined) {
        evolutions[i].sprite = pokemonEvol[i].sprites.front_default;
      }
    }

    evolutionLine = (
      <div className={b('evolution-line')}>
        <h3>
          <strong>Evolution Line</strong>
        </h3>
        <div className={b('poke-line')}>
          {evolutions.map((poke, i) => {
            const pokeId = poke.url.match(/\/(\d+)\//)!?.[1];

            /* const evolType = (obj: any): any =>
              Object.keys(obj).reduce((res, el: string | number): any => {
                console.log(obj[el]);
                if (obj[el] !== null) {
                  return obj[el];
                }
              }, []); */
            function removeEmpty(obj: any): To {
              return Object.entries(obj)
                .filter(([_, v]) => v != null)
                .reduce(
                  (acc, [k, v]) => ({
                    ...acc,
                    [k]: v === Object(v) ? removeEmpty(v) : v,
                  }),
                  {}
                );
            }

            const to: To = removeEmpty(poke.evolves);

            const getEvoType = () => {
              let typeEvol: Evol = { key: '', value: null };
              for (const [key, value] of Object.entries(to)) {
                /* if (value === null) {
                   if (typeof value === 'object' && value.name !== null) {
                    typeEvol = { key, value: { name: value.name, url: value.url } };
                  } else {
                    typeEvol = { key, value };
                  }
                  break; 
                } else {
                  typeEvol = { key, value };
                }
              } */
                if (typeof value === 'object' && Object.keys(value).length !== 0) {
                  typeEvol = { key, value: { name: value.name, url: value.url } };
                } else {
                  typeEvol = { key, value };
                }
              }
              switch (typeEvol?.key) {
                case 'null':
                  return null;
                case 'min_level':
                  return <span>{`lvl ${typeEvol?.value}`}</span>;
                case 'item':
                  if (typeof typeEvol?.value == 'object') {
                    return <span>{`item ${typeEvol?.value?.name}`}</span>;
                  }

                case 'min_happiness':
                  return <span>{`happiness ${typeEvol?.value}`}</span>;
                case 'min_beauty':
                  return <span>{`beauty ${typeEvol?.value}`}</span>;
                case 'min_affection':
                  return <span>{`affection ${typeEvol?.value}`}</span>;
                case 'needs_overworld_rain':
                  return <span>{`needs overworld rain ${typeEvol?.value}`}</span>;
                case 'party_species':
                  return <span>{`party species ${typeEvol?.value}`}</span>;
                case 'party_type':
                  return <span>{`party type ${typeEvol?.value}`}</span>;
                case 'time_of_day':
                  return <span>{`time of day ${typeEvol?.value}`}</span>;
                case 'trade_species':
                  return <span>{`trade species ${typeEvol?.value}`}</span>;
                case 'held_item':
                  return <span>{`held item ${typeEvol?.value}`}</span>;
                case 'known_move':
                  return <span>{`known move ${typeEvol?.value}`}</span>;
                case 'known_move_type':
                  return <span>{`known move type ${typeEvol?.value}`}</span>;
                case 'location':
                  return <span>{`location ${typeEvol?.value}`}</span>;
                default:
                  return null;
              }
            };

            let evol = getEvoType();

            if (duplicate) {
            }

            return (
              <div key={pokeId + i} className={b('poke-item')}>
                <div>
                  <Link href={`/pokemon/${pokeId}`} prefetch={false}>
                    <span>{poke.name}</span>
                    <Image
                      className={b('sprite')}
                      src={
                        poke.sprite != null || undefined
                          ? toString(poke.sprite)
                          : '/images/pokeball.webp'
                      }
                      width={120}
                      height={120}
                      alt={poke.name ?? 'pokemon'}
                    ></Image>
                  </Link>
                </div>
                <div className={b('arrow-container')}>
                  <span>{evol}</span>

                  <div className={b('arrows')}>
                    <div className={b('arrow-right')}> {<FaArrowRight />}</div>
                    <div className={b('arrow-down')}> {<FaArrowDown />}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

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

export default General;
