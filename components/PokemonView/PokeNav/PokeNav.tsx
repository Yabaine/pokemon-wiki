import React, { FC, useMemo } from 'react';
import { withBem } from '../../../utils/bem';
import { nextPrevPoke } from '../../../lib/client/react-query/pokemon/useNextPrevPoke';
import Image from 'next/image';
import { PokemonDetails, Sprites } from '../../../types/models/Pokemon';
import { toString } from '../../../lib/client/imageLoaders';
import Link from 'next/link';

type Props = {
  id: string;
  data: PokemonDetails;
};

type arrSprite = {
  [key: string]: string;
  showName: string;
  url: string;
}[];

const PokeNav: FC<Props> = ({ data }) => {
  const b = withBem('poke-nav');

  // No puedo usar useMemo devuelve error: https://reactjs.org/docs/error-decoder.html?invariant=300
  /* const { pokesData } = useMemo(() => nextPrevPoke(data.id), [data.id]); */
  const { pokesData } = nextPrevPoke(data.id);

  let nextPage = data.id + 1;
  let prevPage = data.id - 1;
  let nextPoke = data.id < 905;
  let prevPoke = data.id > 1;
  let POKE_NEXT_SPRITE = `${!pokesData.next ? '' : pokesData.next.sprites.front_default}`;
  let POKE_PREV_SPRITE = `${!pokesData.prev ? '' : pokesData.prev.sprites.front_default}`;
  let POKE_NEXT_NAME = `${!pokesData.next ? '' : pokesData.next.name}`;
  let POKE_PREV_NAME = `${!pokesData.prev ? '' : pokesData.prev.name}`;

  const prev_next = `prev-next${!prevPoke ? '-end' : ''}`;

  return (
    <>
      <div className={b(prev_next)}>
        {prevPoke && (
          <Link prefetch={false} href={`/pokemon/${prevPage}`} passHref>
            <div className={b('prev-next-item')}>
              <div>{prevPage}</div>
              <div>{POKE_PREV_NAME}</div>
              <Image
                className={b('sprite')}
                src={toString(POKE_PREV_SPRITE)}
                width={50}
                height={50}
                alt={'pokemon'}
              ></Image>
            </div>
          </Link>
        )}
        {nextPoke && (
          <Link prefetch={false} href={`/pokemon/${nextPage}`} passHref>
            <div className={b(`prev-next-item`)}>
              {' '}
              <Image
                className={b('sprite')}
                src={toString(POKE_NEXT_SPRITE)}
                width={50}
                height={50}
                alt={'pokemon'}
              ></Image>
              <div>{POKE_NEXT_NAME}</div>
              <div>{nextPage}</div>
            </div>
          </Link>
        )}
      </div>
      <hr className={b('line')}></hr>
    </>
  );
};

export default PokeNav;
