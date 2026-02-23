import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import tabsStyles from './tabs.module.css';

interface ITabsProps {
  current: string;
  setCurrent: (value: string) => void;
}

export default function Tabs({ current, setCurrent }: ITabsProps) {
  const tabs = [
    { value: 'bun', label: 'Булки' },
    { value: 'sauce', label: 'Соусы' },
    { value: 'main', label: 'Начинки' },
  ];

  return (
    <div className={tabsStyles.tabs}>
      {tabs.map(({ value, label }) => (
        <Tab
          key={value}
          value={value}
          active={current === value}
          onClick={setCurrent}
        >
          {label}
        </Tab>
      ))}
    </div>
  );
}
