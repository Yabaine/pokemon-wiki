import React, { FC } from 'react';
import { withBem } from '../../utils/bem';

type Props = {
  direction: string;
  thead: any;
  children: any;
};

const Table: FC<Props> = ({ thead, children, direction }) => {
  const b = withBem('table');

  return (
    <div className={b('table-auto')}>
      <table className={`table-${direction}`}>
        <thead className={b(`thead-${direction} flex`)}>
          <tr>
            {thead.map((item: string) => {
              return (
                <th className={`grid-cols-[${thead.length}]`} key={item}>
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={b(`tbody-${direction}`)}>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
