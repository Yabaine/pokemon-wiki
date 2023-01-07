import React, { FC } from 'react';
import { withBem } from '../../utils/bem';
import Link from 'next/link';
import ModalSearch from '../Modals/ModalSearch';

const Navbar: FC = () => {
  const b = withBem('navbar');

  return (
    <nav className={b()}>
      <div className={b('container')}>
        <Link href={'/'}>Home</Link>
        <ModalSearch />
      </div>
    </nav>
  );
};

export default Navbar;
