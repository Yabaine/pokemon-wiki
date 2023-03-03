import React, { FC, useRef } from 'react';
import { withBem } from '../../utils/bem';
import { useMainTab } from '../../lib/client/providers/Zustand';
import Button from '../Button';

type Props = {
  tabs: {
    name: string;
    icon: JSX.Element;
  }[];
};

const Tabs: FC<Props> = ({ tabs }) => {
  const b = withBem('tabs');
  const tabuladors = useRef<HTMLDivElement>(null);

  const setTab = useMainTab((state) => state.setTab);

  const tab = tabs.map((tab) => {
    const { name, icon } = tab;
    return (
      <Button
        key={name}
        variant="transparent"
        className={b('tab !flex')}
        onClick={() => {
          setTab(name);
        }}
      >
        {icon}
        {name}
      </Button>
    );
  });

  return (
    <div
      role={'tablist'}
      ref={tabuladors}
      aria-labelledby="tablist"
      className={b('tablist')}
    >
      {tab}
    </div>
  );
};

export default Tabs;
