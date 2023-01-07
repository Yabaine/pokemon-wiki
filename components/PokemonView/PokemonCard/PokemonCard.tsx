import React, { FC, useCallback, useEffect, useState } from 'react';
import { withBem } from '../../../utils/bem';
import { useAllPokemon } from '../../../lib/client/react-query/pokemon/useAllPokemon';
import Image from 'next/image';
import { Sprites } from '../../../types/models/Pokemon';
import { toString } from '../../../lib/client/imageLoaders';
import router from 'next/router';

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'react-headless-accordion';

type Props = {
  sprites: Sprites;
  name: string;
};

type arrSprite = {
  [key: string]: string;
  showName: string;
  url: string;
}[];

type Handle = (url: string) => void;

type basicSprites = Omit<Sprites, 'versions'>;

let arrSprites: arrSprite = [];

/* const arrGens2: arrGen = [
  {
    showName: 'Back',
    type: 'back_default',
  },
  {
    showName: 'Back Female',
    type: 'back_female',
  },
  {
    showName: 'Back Shiny',
    type: 'back_shiny',
  },
  {
    showName: 'Back Shiny Female',
    type: 'back_shiny_female',
  },
  {
    showName: 'Front',
    type: 'front_default',
  },
  {
    showName: 'Front Female',
    type: 'front_female',
  },
  {
    showName: 'Front Shiny',
    type: 'front_shiny',
  },
  {
    showName: 'Front Shiny Female',
    type: 'front_shiny_female',
  },
]; */

const PokemonCard: FC<Props> = ({ sprites, name }) => {
  const b = withBem('poke-card');
  const [sprite, setSprite] = useState('');

  useEffect(() => {
    /* setSprite(sprites.front_shiny as string); */
    return setSprite('');
  }, [sprites]);

  //https://stackoverflow.com/questions/67365459/dynamic-nested-accordion-with-nested-children

  const filter = useCallback(
    (sprites: Sprites) => {
      arrSprites = [];
      const keyify = (obj: any, prefix = ''): any =>
        Object.keys(obj).reduce((res, el: string): any => {
          if (typeof obj[el] === 'object' && obj[el] !== null) {
            return [...res, ...keyify(obj[el], prefix + el + ' ')];
          }
          if (typeof obj[el] == 'string') {
            arrSprites.push({ showName: prefix + el, url: obj[el] });
          }

          return res;
        }, []);
      keyify(sprites);
    },
    [sprites]
  );

  filter(sprites);

  const handleSprite: Handle = (url) => {
    setSprite(url);
  };

  //TabsJSX
  const genMap = arrSprites.map(
    (gen): JSX.Element => (
      <li onClick={() => handleSprite(gen.url)} key={gen.showName}>
        <button>{gen.showName}</button>
      </li>
    )
  );

  return (
    <>
      <div className={b('card')}>
        <ul className={b('tabs')}>{genMap}</ul>
        <Image
          className={b('sprite')}
          //Convertimos data.sprite.. en string con este metodo
          // porque src: type solo puede ser de src: string | StaticImport
          // y nuestro data.sprite es string | null
          src={
            sprite != ''
              ? toString(sprite)
              : sprites.front_shiny
              ? sprites.front_shiny
              : ''
          }
          width={120}
          height={120}
          alt={name ?? 'pokemon'}
        ></Image>
      </div>
    </>
  );
};

export default PokemonCard;
