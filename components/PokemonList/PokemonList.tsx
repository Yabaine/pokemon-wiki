import React, { FC, useState } from 'react';
import { withBem } from '../../utils/bem';
import { motion } from 'framer-motion';
import { useAllPokemon } from '../../lib/client/react-query/pokemon/useAllPokemon';
import PokemonItem from '../PokemonItem';

//Todo genType en .map

const PokemonList: FC = () => {
  const b = withBem('poke-list');
  const { data } = useAllPokemon();
  const [tab, setTab] = useState({ ini: 0, fin: 151 });

  let parent = {
    show: {
      transition: {
        staggerChildren: 0.002,
      },
    },
  };

  type genType = {
    name:
      | 'Gen I'
      | 'Gen II'
      | 'Gen III'
      | 'Gen IV'
      | 'Gen V'
      | 'Gen VI'
      | 'Gen VII'
      | 'Gen VIII';
    id: number;
    offSet: {
      ini: number;
      fin: number;
    };
  };

  const gens = [
    { name: 'Gen I', id: 1, offSet: { ini: 0, fin: 151 } },
    { name: 'Gen II', id: 2, offSet: { ini: 151, fin: 251 } },
    { name: 'Gen III', id: 3, offSet: { ini: 251, fin: 386 } },
    { name: 'Gen IV', id: 4, offSet: { ini: 386, fin: 494 } },
    { name: 'Gen V', id: 5, offSet: { ini: 494, fin: 649 } },
    { name: 'Gen VI', id: 6, offSet: { ini: 649, fin: 721 } },
    { name: 'Gen VII', id: 7, offSet: { ini: 721, fin: 809 } },
    { name: 'Gen VIII', id: 8, offSet: { ini: 809, fin: 905 } },
    /* 'Gen II',
    'Gen III',
    'Gen IV',
    'Gen V',
    'Gen VI',
    'Gen VII',
    'Gen VIII', */
  ];

  //Tabs
  const genMap = gens.map(
    (gen): JSX.Element => (
      <li key={gen.name} className="mr-2">
        <button
          onClick={() => setTab({ ini: gen.offSet.ini, fin: gen.offSet.fin })}
          className={b('not-active')}
        >
          {gen.name}
        </button>
      </li>
    )
  );

  if (!data) return null;

  return (
    <>
      <div className=" mb-5 text-lg font-bold text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap justify-center -mb-px">{genMap}</ul>
      </div>
      <motion.div
        variants={parent}
        initial="hidden"
        animate="show"
        className={b('columns')}
      >
        {' '}
        {data.results.length > 0
          ? data.results
              ?.slice(tab.ini, tab.fin)
              .map((poke) => <PokemonItem key={poke.name} pokemon={poke}></PokemonItem>)
          : 'Sin resultados'}
      </motion.div>
    </>
  );
};

export default PokemonList;
