import React, { FC } from 'react';
import { withBem } from '../../utils/bem';

type Props = {
  type?: 'base' | 'sticky';
  height?: 'small' | 'auto';
  thead?: any;
  children: any;
};

const Table: FC<Props> = ({ thead = null, children, type = 'base', height = 'auto' }) => {
  const b = withBem('table');

  return (
    <table className={b(height)}>
      {thead && (
        <thead className={b(`thead-${type}`)}>
          <tr>
            {thead.map((item: string) => {
              return <th key={item}>{item}</th>;
            })}
          </tr>
        </thead>
      )}
      <tbody className={b(`tbody`)}>{children}</tbody>
    </table>
  );
};

export default Table;
