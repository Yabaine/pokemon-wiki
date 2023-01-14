import React, { FC } from 'react';
import { withBem } from '../../../../utils/bem';

const Stats: FC = () => {
  const b = withBem('stats');

  return (
    <nav className={b()}>
      <div className={b('container')}>Stats</div>
    </nav>
  );
};

export default Stats;
