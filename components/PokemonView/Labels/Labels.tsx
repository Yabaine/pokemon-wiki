import React, { FC, useEffect } from 'react';
import { withBem } from '../../../utils/bem';
import { GroupGenPokeDX } from '../../../lib/client/constants';
import { BiBookmarkAlt } from 'react-icons/bi';
import { useCurrentGen } from '../../../lib/client/providers/Zustand';
import { Gens } from '../../../lib/client/constants';
import { PokemonDetails } from '../../../types/models/Pokemon';

type Props = {
  pokemon: PokemonDetails;
  baseGen: string;
  mapped: GroupGenPokeDX;
};

const Labels: FC<Props> = ({ baseGen, pokemon, mapped }) => {
  const b = withBem('labels');

  const { currentGen, setCurrentGen } = useCurrentGen();

  const laterGen = Gens.slice(Gens.indexOf(baseGen));

  const gensAltName = laterGen.map((_, i) => {
    return mapped.find((el) => el.gen.name === laterGen[i])?.gen;
  });

  const handleClick = (gen: string) => {
    setCurrentGen(gen);
  };

  useEffect(() => {
    if (laterGen.includes(currentGen)) {
      return;
    } else {
      setCurrentGen(laterGen[0]);
    }
  }, [baseGen]);

  console.log(currentGen);

  return (
    <div className={b('')}>
      {gensAltName.map((gen) => {
        return (
          <button
            onClick={() => handleClick(gen?.name as string)}
            key={gen?.name}
            className={b('gen')}
          >
            <BiBookmarkAlt
              className={b(`icon${currentGen == gen?.name ? '-main' : ''}`)}
            ></BiBookmarkAlt>
            <span>{gen?.altName}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Labels;
