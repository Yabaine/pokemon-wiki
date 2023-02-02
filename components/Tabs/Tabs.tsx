import React, { FC } from 'react';
import { withBem } from '../../utils/bem';
import { useMainTab } from '../../lib/client/providers/Zustand';

type Props = {
  tabs: {
    name: string;
    icon: JSX.Element;
  }[];
};

const Tabs: FC<Props> = ({ tabs }) => {
  const b = withBem('tabs');

  const setTab = useMainTab((state) => state.setTab);

  const tab = tabs.map((tab) => {
    const { name, icon } = tab;
    return (
      <button
        key={name}
        onClick={() => {
          console.log(name), setTab(name);
        }}
        role={'tab'}
        className={b('tab')}
      >
        {icon}
        {name}
      </button>
    );
  });

  return (
    <div role={'tablist'} aria-labelledby="tablist" className={b('tablist')}>
      {tab}
    </div>
  );
};

export default Tabs;
