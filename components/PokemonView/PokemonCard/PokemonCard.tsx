import React, { FC, useCallback, useEffect, useState } from 'react';
import { withBem } from '../../../utils/bem';
import Image from 'next/image';
import { Sprites } from '../../../types/models/Pokemon';
import { toString } from '../../../lib/client/imageLoaders';

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

const PokemonCard: FC<Props> = ({ sprites, name }) => {
  const b = withBem('poke-card');
  const [sprite, setSprite] = useState('');

  useEffect(() => {
    /* setSprite(sprites.front_shiny as string); */
    return setSprite('');
  }, [sprites]);

  //https://stackoverflow.com/questions/67365459/dynamic-nested-accordion-with-nested-children

  /* Ñ3 */
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
        {/* <ul className={b('tabs')}>{genMap}</ul> */}
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
          /* width={120}
          height={120} */
          fill
          alt={name ?? 'pokemon'}
          quality={75}
        ></Image>
      </div>
    </>
  );
};

export default PokemonCard;
