import { FC, useEffect } from 'react';
import { Gens } from '../../../lib/client/constants';
import { useCurrentGen } from '../../../lib/client/providers/Zustand';
import { GENERATIONS } from '../../../model/generations/enums/Generations';
import { TypeGroupGenPokeDX } from '../../../types/models/GroupGenPokeDX';
import { withBem } from '../../../utils/bem';

type Props = {
  baseGen: GENERATIONS;
  mapped: TypeGroupGenPokeDX;
  sideMenu: () => void;
};

const Labels: FC<Props> = ({ baseGen, mapped, sideMenu }) => {
  const b = withBem('labels');

  const { currentGen, setCurrentGen } = useCurrentGen();

  const laterGen = Gens.slice(Gens.indexOf(baseGen));

  const gensAppearances = laterGen.map((_, i) => {
    return mapped.find((el) => el.gen.name === laterGen[i]);
  });

  const handleClick = (gen: GENERATIONS) => {
    sideMenu();
    setCurrentGen(gen);
  };

  useEffect(() => {
    if (laterGen.includes(currentGen)) {
      return;
    } else {
      setCurrentGen(laterGen[0]);
    }
  }, [baseGen]);

  return (
    <div className={b('')}>
      {gensAppearances.map((gen) => {
        return (
          <button
            onClick={() => handleClick(gen?.gen?.name as GENERATIONS)}
            key={gen?.gen?.name}
            className={b(`gen${currentGen == gen?.gen?.name ? '-main' : ''}`)}
          >
            {/* <BiBookmarkAlt
              className={b(`icon${currentGen == gen?.name ? '-main' : ''}`)}
            ></BiBookmarkAlt> */}
            {/* <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="25.000000pt"
              height="25.000000pt"
              viewBox="0 0 72.000000 72.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="rotate(-90 30 30) translate(0.000000,72.000000) scale(0.100000,-0.100000)"
                fill="green"
                stroke="none"
              >
                <path
                  d="M149 691 l-29 -29 0 -136 0 -136 90 0 90 0 0 -195 c0 -136 3 -195 11
-195 6 0 38 23 71 50 33 28 63 50 67 50 3 0 34 -23 68 -50 34 -28 67 -50 72
-50 8 0 11 102 11 321 0 349 -2 363 -57 388 -14 7 -93 11 -194 11 l-171 0 -29
-29z m131 -21 c18 -18 20 -33 20 -135 l0 -115 -75 0 -75 0 0 115 c0 132 11
155 75 155 22 0 43 -8 55 -20z m269 -6 c20 -26 21 -38 21 -321 l0 -295 -24 19
c-13 10 -40 31 -60 47 l-36 29 -60 -47 -60 -47 0 301 c0 189 -4 309 -10 321
-10 18 -6 19 99 19 106 0 110 -1 130 -26z"
                />
              </g>
            </svg> */}
            <span>{gen?.gen?.altName}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Labels;
