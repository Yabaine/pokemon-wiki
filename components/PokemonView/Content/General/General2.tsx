import React, { FC } from 'react';
import { withBem } from '../../../../utils/bem';
import { PokemonSpecie } from '../../../../types/models/PokemonSpecie';
import { PokemonDetails } from '../../../../types/models/Pokemon';
import { useEvolutions } from '../../../../lib/client/react-query/pokemon/ddd';
import { useSeveralPokemon } from '../../../../lib/client/react-query/pokemon/useSeveralPokemon';
import { getDescFromGames } from '../../../../backend/scrapper/index.mjs';
import { filterItemsByGen } from '../../../../backend/scrapper/index.mjs';
import { Effectivness } from '../../../../lib/client/constants';
import { EffectivnessTypes } from '../../../../lib/client/constants';
import { EvolObjectPokemon } from '../../../../lib/client/react-query/pokemon/useEvolutions';
import Image from 'next/image';
import Link from 'next/dist/client/link';
import { toString } from '../../../../lib/client/imageLoaders';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';

interface Props {
  currentGen: string;
  pokemon: PokemonDetails;
  specie: PokemonSpecie;
}

type item = {
  name: string;
  url: string;
};

type desc = {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}[];

interface Evol {
  key: string;
  value: number | item | null | string;
}

interface To {
  [key: string]: string | number | any | null;
}

type Tipo = {
  [key: string]: number;
};

type Grade = {
  [key: string]: string[];
};

/* Ñ5 */

const General2: FC<Props> = ({ currentGen, pokemon, specie }) => {
  const b = withBem('general');
  let evolutionLine: JSX.Element | null = null;
  let items: JSX.Element | null = null;
  let description: JSX.Element | null = null;
  let reg = /\/(\d+)\//;
  let pokeID: string[] = [];

  // No hay ningun propiedad que nos indique si el pokemon tiene evolucion o no
  // por lo que tenemos que hacer una validacion/llamada para saber si tiene evolucion o no
  const evolutionChainId = specie.evolution_chain.url.match(reg)!?.[1];
  const evolutions = useEvolutions(evolutionChainId);
  /* const uniqueValues = new Set(evolutions.map((v) => v.name)); */

  /* function adjustBrightness(col: string, amt: number) {
    var usePound = false;

    if (col[0] == '#') {
      col = col.slice(1);
      usePound = true;
    }

    var R = parseInt(col.substring(0, 2), 16);
    var G = parseInt(col.substring(2, 4), 16);
    var B = parseInt(col.substring(4, 6), 16);

    R = R + amt;
    G = G + amt;
    B = B + amt;

    if (R > 255) R = 255;
    else if (R < 0) R = 0;

    if (G > 255) G = 255;
    else if (G < 0) G = 0;

    if (B > 255) B = 255;
    else if (B < 0) B = 0;

    var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
    var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
    var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);
    console.log((usePound ? '#' : '') + RR + GG + BB);

    return (usePound ? '#' : '') + RR + GG + BB;
  } */

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

    const pokeline = getLineEvol(evolutions);

    evolutionLine = (
      <div className={b('evolution-line')}>
        <h3>
          <strong>Evolution Line</strong>
        </h3>
        <div className={b('poke-line')}>{pokeline}</div>
      </div>
    );

    function getLineEvol(evolutions: EvolObjectPokemon) {
      return evolutions.map((poke, i) => {
        const pokeId = poke.url.match(/\/(\d+)\//)!?.[1];

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

        return (
          <div key={pokeId + i} className={b('poke-item')}>
            <div className={b('arrow-container')}>
              <span>{evol}</span>

              <div className={b('arrows')}>
                <div className={b('arrow-right')}> {<FaArrowRight />}</div>
                <div className={b('arrow-down')}> {<FaArrowDown />}</div>
              </div>
            </div>
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
          </div>
        );
      });
    }
  }

  /* const abilities: JSX.Element = (
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
  ); */

  /* class EffectivnesTypesClass {
    tipos: Tipo;
    effectivnessGrades: string[];
    grade: Grade;
    pokeTypes: EffectivnessTypes[];

    constructor() {
      this.effectivnessGrades = [
        '(x4) double effective',
        '(x2) very effective',
        '(x1) normal',
        '(/2) resited',
        '(/4) double resited',
        '(0) no effect',
      ];

      this.tipos = {
        normal: 1,
        fire: 1,
        water: 1,
        grass: 1,
        electric: 1,
        ice: 1,
        fighting: 1,
        poison: 1,
        ground: 1,
        flying: 1,
        psychic: 1,
        bug: 1,
        rock: 1,
        ghost: 1,
        dragon: 1,
        dark: 1,
        steel: 1,
        fairy: 1,
      };

      this.grade = {
        '(x4) double effective': [],
        '(x2) very effective': [],
        '(x1) normal': [],
        '(/2) resited': [],
        '(/4) double resited': [],
        '(0) no effect': [],
      };

      this.pokeTypes = [];
    }

    getPokeTypes() {
      return Effectivness.filter((item: EffectivnessTypes) => {
        return pokemon.types.find((e) => {
          if (e.type.name == item.name) {
            return item.damage;
          }
        });
      });
    }

    calculateEffectivness() {
      this.pokeTypes = this.getPokeTypes();

      this.pokeTypes.forEach((item: EffectivnessTypes) => {
        this.grade = {
          '(x4) double effective': [],
          '(x2) very effective': [],
          '(x1) normal': [],
          '(/2) resited': [],
          '(/4) double resited': [],
          '(0) no effect': [],
        };

        Effectivness.map((el: EffectivnessTypes) => {
          for (const [key, value] of Object.entries(el.damage)) {
            if (key == item.name) {
              this.tipos[el.name] = this.tipos[el.name] * value;

              this.grade[key].push(el.name);
            }
          }
        });
      });
    }
  } */

  const EffectivnesTypes = (): JSX.Element => {
    let tipos: Tipo = {
      normal: 1,
      fire: 1,
      water: 1,
      grass: 1,
      electric: 1,
      ice: 1,
      fighting: 1,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 1,
      bug: 1,
      rock: 1,
      ghost: 1,
      dragon: 1,
      dark: 1,
      steel: 1,
      fairy: 1,
    };
    let grade: Grade = {
      '(x4) double effective': [],
      '(x2) very effective': [],
      '(x1) normal': [],
      '(/2) resited': [],
      '(/4) double resited': [],
      '(0) no effect': [],
    };

    //Recupera las características de los tipos del tipo de pokemon que se esta buscando
    const types = Effectivness.filter((item: EffectivnessTypes) => {
      return pokemon.types.find((e) => {
        if (e.type.name == item.name) {
          return item.damage;
        }
      });
    });

    //Calcula la efectividad de los tipos del pokemon
    const calculateEffectivness = (types: EffectivnessTypes[]) => {
      types.forEach((type) => {
        grade = {
          '(x4) double effective': [],
          '(x2) very effective': [],
          '(x1) normal': [],
          '(/2) resited': [],
          '(/4) double resited': [],
          '(0) no effect': [],
        };
        Effectivness.map((el: EffectivnessTypes) => {
          for (const [key, value] of Object.entries(el.damage))
            if (key == type.name) {
              tipos[el.name] = tipos[el.name] * value;
              switch (tipos[el.name]) {
                case 4:
                  grade['(x4) double effective'].push(el.name);
                  break;
                case 2:
                  grade['(x2) very effective'].push(el.name);
                  break;
                case 1:
                  grade['(x1) normal'].push(el.name);
                  break;
                case 0.5:
                  grade['(/2) resited'].push(el.name);
                  break;
                case 0.25:
                  grade['(/4) double resited'].push(el.name);
                  break;
                case 0:
                  grade['(0) no effect'].push(el.name);
                  break;
                default:
                  break;
              }
            }
        });
      });
      return grade;
    };

    const gradeEf = calculateEffectivness(types);

    const effectivnessTable: JSX.Element = (
      <div>
        <h3>Effectivness</h3>
        <table className={b('table')}>
          <tbody>
            {Object.entries(gradeEf).map(([key, value]) => {
              return (
                <tr key={key}>
                  <th>{key}</th>
                  {value.length > 0 ? (
                    <td>
                      <div>
                        {value.map((item) => {
                          let typeColor = Effectivness.find((el) => {
                            return el.name == item;
                          });

                          return (
                            <span
                              style={{
                                backgroundColor: typeColor!.color.base,
                                outline: `1px solid ${typeColor!.color.darken}`,
                                textShadow: `1px 2px 3px black`,
                              }}
                              key={item}
                            >
                              {item}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>{' '}
      </div>
    );

    return effectivnessTable;
  };

  /* const effectivnessTable = new EffectivnesTypesClass();
  effectivnessTable.calculateEffectivness(); */

  const effectivnessTable = EffectivnesTypes();

  const itemHeld = filterItemsByGen(currentGen, pokemon.held_items);

  items = (
    <div className={b('items')}>
      <div>Items</div>
      {itemHeld.length > 0 ? (
        <table className={b('table')}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Rate</th>
              <th>Game</th>
            </tr>
          </thead>
          <tbody>
            {itemHeld.map((details: any) => {
              return (
                <tr key={details.item.name}>
                  <th>{details.item.name}</th>
                  {details.version_details.map((item: any) => {
                    return (
                      <td className={b('item-list')} key={item.version.name}>
                        <div>
                          {' '}
                          <span>{`${item.rarity}% `}</span>
                          <span>{item.version.name}</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>
          <span>{`${pokemon.name} has no items in ${currentGen}`}</span>
        </div>
      )}
    </div>
  );

  const desc: desc = getDescFromGames(currentGen, specie.flavor_text_entries);

  description = (
    <div className={b('description')}>
      <div>Description</div>
      {desc.length > 0 ? (
        <table className={b('table')}>
          <tbody>
            {desc.map((el, id) => (
              <tr key={id}>
                <th>{el.version.name}</th>
                <td>{el.flavor_text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Description not available </div>
      )}
    </div>
  );

  return (
    <article className={'general'}>
      {evolutionLine}
      {effectivnessTable}
      {items}
      {description}
    </article>
  );
};

export default General2;
