import React, { FC, useRef } from 'react';
import { withBem } from '../../utils/bem';
import Link from 'next/link';
import ModalSearch from '../Modals/ModalSearch';
import Labels from '../PokemonView/Labels';
import { PokemonDetails } from '../../types/models/Pokemon';
import { TypeGroupGenPokeDX } from '../../types/models/GroupGenPokeDX';
import { useCurrentGen } from '../../lib/client/providers/Zustand';
import { GENERATIONS } from '../../model/generations/enums/Generations';

type Props = {
  pokemon: PokemonDetails;
  baseGen: GENERATIONS;
  mapped: TypeGroupGenPokeDX;
};

const Navbar: FC<Props> = ({ baseGen, pokemon, mapped }) => {
  const b = withBem('navbar');

  /* const currentGen = useCurrentGen((state) => state.currentGen); */
  const { currentGen } = useCurrentGen();

  const openMenu = () => {
    const sideMenu = menu.current;
    const butto = btn.current;
    if (butto == null) return;
    if (sideMenu == null) return;
    if (sideMenu.className === 'navbar-open') {
      sideMenu.className = 'navbar';
    } else {
      sideMenu.className = 'navbar-open';
    }
    if (butto.className === 'navbar__menu-hidden') {
      butto.className = 'navbar__menu';
    } else {
      butto.className = 'navbar__menu-hidden';
    }
  };

  const menu = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  const regex = new RegExp(/(?<=-).*/);

  return (
    <nav ref={menu} className={b('')}>
      {/* https://codepen.io/synapse791/pen/YGeYvG */}
      <button ref={btn} className={b('menu')} onClick={() => openMenu()}>
        {`GEN ${regex.exec(currentGen)}`}
      </button>
      <div className={b('container')}>
        {/* <Link href={'/'}>Home</Link>
        <ModalSearch /> */}
        <Labels sideMenu={openMenu} baseGen={baseGen} mapped={mapped}></Labels>
      </div>
    </nav>
  );
};

export default Navbar;
