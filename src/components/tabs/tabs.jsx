import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import tabsStyles from './tabs.module.css';

export default function Tabs({ current, setCurrent }) {
  const tabs = [
    { value: 'one', label: 'Булки' },
    { value: 'two', label: 'Соусы' },
    { value: 'three', label: 'Начинки' },
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

Tabs.propTypes = {
  current: PropTypes.string.isRequired,
  setCurrent: PropTypes.func.isRequired,
};
