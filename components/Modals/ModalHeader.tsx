import React, { FC } from 'react';
import { withBem } from '../../utils/bem';
import Search from '../Search';

type Props = {
  type?: string;
};

const ModalHeader: FC<Props> = ({ type }) => {
  const b = withBem('modal');

  if (type === 'search') {
    return (
      <div>
        <Search />
      </div>
    );
  }

  return null;
};

export default ModalHeader;
