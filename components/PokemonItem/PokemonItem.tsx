import React, { FC, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { withBem } from '../../utils/bem';
import { PokeNameUrl } from '../../types/models/Pokemon';
import { motion } from 'framer-motion';

type Props = {
  pokemon: PokeNameUrl;
};

let pokeItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const PokemonItem: FC<Props> = ({ pokemon }) => {
  const b = withBem('poke-item');
  /* const pokeHref = {
    pathname: '/pokemon/[id]',
    query: { id: pokemon.name },
  }; */

  return (
    <motion.div variants={pokeItem}>
      <Link href={`/pokemon/${pokemon.name}`} prefetch={false}>
        <div className='className="block max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"'>
          <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white text-ellipsis overflow-hidden">
            {pokemon.name}
          </h5>
        </div>
      </Link>
    </motion.div>
  );
};

export default PokemonItem;
