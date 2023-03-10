import Link from 'next/dist/client/link';
import Image from 'next/image';
import { FC } from 'react';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';
import {
  filterItemsByGen,
  getDescFromGames,
} from '../../../../backend/scrapper/index.mjs';
import { toString } from '../../../../lib/client/imageLoaders';
import { useEvolutions } from '../../../../lib/client/react-query/pokemon/ddd';
import { EvolObjectPokemon } from '../../../../lib/client/react-query/pokemon/useEvolutions';
import { useSeveralPokemon } from '../../../../lib/client/react-query/pokemon/useSeveralPokemon';
import { GAMES_COLOR } from '../../../../model/games/constants/GamesColors';
import { TYPES_COLOR } from '../../../../model/pokemon/constants/TypesColor';
import { HeldItem, PokemonDetails } from '../../../../types/models/Pokemon';
import { FlavorTextEntry, PokemonSpecie } from '../../../../types/models/PokemonSpecie';
import { withBem } from '../../../../utils/bem';
import Table from '../../../Table/Table';
import TableGeneric from '../../../Table/Tablegeneric';
import { EffectivnesTypesClass } from './effectivness/Effectivness';

interface Props {
  currentGen: string;
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

/* Ñ5 */

const General: FC<Props> = ({ currentGen, pokemon, specie }) => {
  const b = withBem('general');
  let evolutionLine: JSX.Element | null = null;
  // regex replace - for spaces
  const TYPES = pokemon.types.map((item) => item.type.name);
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
        <h2>Evolution Line</h2>
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

  const typesSorted = new EffectivnesTypesClass(TYPES);

  const Types: FC = () => {
    return (
      <div>
        <h2>Effectivness</h2>
        <Table>
          {Object.entries(typesSorted.grade).map(([key, value]) => {
            return (
              <tr key={key}>
                <th>{key}</th>
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
              </tr>
            );
          })}
        </Table>
      </div>
    );
  };

  const itemHeld: HeldItem[] = filterItemsByGen(currentGen, pokemon.held_items);

  const Items: FC = () => {
    return (
      <div className={b('items')}>
        <h2>Items</h2>
        {itemHeld.length > 0 ? (
          <>
            <Table>
              <tr>
                <th>Item</th>
                <th>Rate</th>
                <th>Game</th>
              </tr>
              {itemHeld.map((details) => {
                return (
                  <tr key={details.item.name}>
                    <td>{details.item.name.replace('-', ' ')}</td>
                    <td className="item">
                      {details.version_details.map((item, id) => {
                        return <span key={id}>{`${item.rarity}% `}</span>;
                      })}
                    </td>
                    <td className="item">
                      {details.version_details.map((item, id) => {
                        return (
                          <span key={id}>{item.version.name.replace('-', ' ')}</span>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
            </Table>
          </>
        ) : (
          <p
            className={b('no-items')}
          >{`${pokemon.name} has no items in ${currentGen}`}</p>
        )}
      </div>
    );
  };

  const desc: FlavorTextEntry[] = getDescFromGames(
    currentGen,
    specie.flavor_text_entries
  );
  const Description: FC = () => {
    return (
      <div className={b('description')}>
        <h2>Description</h2>
        {desc.length > 0 ? (
          <Table>
            {desc.map((el, id) => (
              <tr key={id}>
                <th
                  style={{
                    backgroundColor: `${GAMES_COLOR[el.version.name].base}`,
                  }}
                >
                  {el.version.name.replace('-', ' ')}
                </th>
                <td
                  style={{
                    backgroundColor: `${GAMES_COLOR[el.version.name].light}`,
                  }}
                >
                  {el.flavor_text}
                </td>
              </tr>
            ))}
          </Table>
        ) : (
          <p>Description not available </p>
        )}
      </div>
    );
  };

  return (
    <article className={'general'}>
      {evolutionLine}
      <Types></Types>
      <Items></Items>
      <Description></Description>
    </article>
  );
};

export default General;
