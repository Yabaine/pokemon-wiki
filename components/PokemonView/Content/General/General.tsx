import Link from 'next/dist/client/link';
import Image from 'next/image';
import { FC } from 'react';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';
import {
  filterItemsByGen,
  getDescFromGames,
} from '../../../../backend/scrapper/index.mjs';
import { Effectivness, EffectivnessTypes } from '../../../../lib/client/constants';
import { toString } from '../../../../lib/client/imageLoaders';
import { useEvolutions } from '../../../../lib/client/react-query/pokemon/ddd';
import { EvolObjectPokemon } from '../../../../lib/client/react-query/pokemon/useEvolutions';
import { useSeveralPokemon } from '../../../../lib/client/react-query/pokemon/useSeveralPokemon';
import { TYPES_COLOR } from '../../../../model/pokemon/constants/TypesColor';
import { TYPES_DAMAGES } from '../../../../model/pokemon/constants/TypesDamages';
import { POKEMON_TYPE } from '../../../../model/pokemon/enums/PokemonType';
import { PokemonDetails } from '../../../../types/models/Pokemon';
import { PokemonSpecie } from '../../../../types/models/PokemonSpecie';
import { withBem } from '../../../../utils/bem';
import { filterSearchTerm } from '../../../../utils/index';

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
  [key in POKEMON_TYPE]: number;
};

type PokemonTypes = POKEMON_TYPE;

enum MULTIPLIER_RATES {
  '(x4) Double effective' = 4,
  '(x2) Effective' = 2,
  '(x1) Normal' = 1,
  '(/2) Resisted' = 0.5,
  '(/4) Double Resisted' = 0.25,
  '(0) Null' = 0,
}

type MultiplierType = {
  [key in MULTIPLIER_RATES]: POKEMON_TYPE[];
};

/* Ñ5 */

const General: FC<Props> = ({ currentGen, pokemon, specie }) => {
  const b = withBem('general');
  let evolutionLine: JSX.Element | null = null;
  let items: JSX.Element | null = null;
  let description: JSX.Element | null = null;
  // regex replace - for spaces
  const REG_ID = /\/(\d+)\//;
  let pokeID: string[] = [];

  // No hay ningun propiedad que nos indique si el pokemon tiene evolucion o no
  // por lo que tenemos que hacer una validacion/llamada para saber si tiene evolucion o no
  const evolutionChainId = specie.evolution_chain.url.match(REG_ID)!?.[1];
  const evolutions = useEvolutions(evolutionChainId);
  /* const uniqueValues = new Set(evolutions.map((v) => v.name)); */

  evolutions.map((poke) => {
    pokeID.push(poke.url.match(REG_ID)!?.[1]);
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

  class EffectivnesTypesClass {
    baseMultiplier: Tipo;
    grade: MultiplierType;
    currentPokemonType: POKEMON_TYPE[];

    constructor() {
      this.baseMultiplier = {
        [POKEMON_TYPE.NORMAL]: 1,
        [POKEMON_TYPE.FIRE]: 1,
        [POKEMON_TYPE.WATER]: 1,
        [POKEMON_TYPE.GRASS]: 1,
        [POKEMON_TYPE.ELECTRIC]: 1,
        [POKEMON_TYPE.ICE]: 1,
        [POKEMON_TYPE.FIGHTING]: 1,
        [POKEMON_TYPE.POISON]: 1,
        [POKEMON_TYPE.GROUND]: 1,
        [POKEMON_TYPE.FLYING]: 1,
        [POKEMON_TYPE.PSYCHIC]: 1,
        [POKEMON_TYPE.BUG]: 1,
        [POKEMON_TYPE.ROCK]: 1,
        [POKEMON_TYPE.GHOST]: 1,
        [POKEMON_TYPE.DRAGON]: 1,
        [POKEMON_TYPE.DARK]: 1,
        [POKEMON_TYPE.STEEL]: 1,
        [POKEMON_TYPE.FAIRY]: 1,
      };

      this.grade = {
        [MULTIPLIER_RATES['(x4) Double effective']]: [],
        [MULTIPLIER_RATES['(x2) Effective']]: [],
        [MULTIPLIER_RATES['(x1) Normal']]: [],
        [MULTIPLIER_RATES['(/2) Resisted']]: [],
        [MULTIPLIER_RATES['(/4) Double Resisted']]: [],
        [MULTIPLIER_RATES['(0) Null']]: [],
      };

      this.currentPokemonType = [];
    }

    getCurrentPokemonTypes() {
      pokemon.types.forEach((item) =>
        this.currentPokemonType.push(item.type.name as PokemonTypes)
      );
    }

    calculateEffectivness() {
      this.currentPokemonType.forEach((type) => {
        for (const [key, value] of Object.entries(TYPES_DAMAGES)) {
          this.baseMultiplier[key as PokemonTypes] *= value[type];
        }
      });
    }

    setEffectivnessTable() {
      for (const [key, value] of Object.entries(this.baseMultiplier)) {
        this.grade[value as MULTIPLIER_RATES].push(key as PokemonTypes);
      }
    }
  }

  class EffectivnessTable {
    grades: MultiplierType;
    constructor(grades: MultiplierType) {
      this.grades = grades;
    }

    getValues(value: POKEMON_TYPE[]) {
      return (
        <>
          {' '}
          {value.length > 0 ? (
            <td>
              <ul>
                {value.map((item) => {
                  return (
                    <li
                      style={{
                        backgroundColor: TYPES_COLOR[item].base,
                        outline: `1px solid ${TYPES_COLOR[item].dark}`,
                        textShadow: `1px 2px 3px black`,
                      }}
                      key={item}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </td>
          ) : (
            <td></td>
          )}
        </>
      );
    }

    getTable() {
      return (
        <div>
          <h3>Effectivness</h3>
          <table className={b('table')}>
            <tbody>
              {Object.entries(this.grades).map(([key, value]) => {
                return (
                  <tr key={key}>
                    <th>{key}</th>
                    {this.getValues(value)}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }

  const getEffectivness = new EffectivnesTypesClass();
  getEffectivness.getCurrentPokemonTypes();
  getEffectivness.calculateEffectivness();
  getEffectivness.setEffectivnessTable();
  const effectivnessTable = new EffectivnessTable(getEffectivness.grade);

  /* const EffectivnesTypes = (): JSX.Element => {
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
 */

  /*   const effectivnessTable = EffectivnesTypes(); */

  const itemHeld = filterItemsByGen(currentGen, pokemon.held_items);

  items = (
    <div className={b('items')}>
      <h3>Items</h3>
      {itemHeld.length > 0 ? (
        <>
          <table className={b('table')}>
            <tbody>
              <tr>
                <th>Item</th>
                <th>Rate</th>
                <th>Game</th>
              </tr>
              {itemHeld.map((details: any, index: number) => {
                return (
                  <tr key={details.item.name}>
                    <td /* rowSpan={details.version_details.length} */>
                      {details.item.name.replace('-', ' ')}
                    </td>
                    <td>
                      {details.version_details.map((item: any) => {
                        return <span>{`${item.rarity}% `}</span>;
                      })}
                    </td>
                    <td>
                      {details.version_details.map((item: any) => {
                        return <span>{item.version.name}</span>;
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
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
      {effectivnessTable.getTable()}
      {items}
      {description}
    </article>
  );
};

export default General;
