import React from 'react';
import {
  Logo, ProfileIcon, BurgerIcon, ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import NavLink from '../../shared/components/link/nav-link';
import appHeaderStyles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={appHeaderStyles.app_header}>
      <div className={appHeaderStyles.left}>
        <NavLink
          to="/"
          icon={<BurgerIcon type="secondary" />}
          text="Конструктор"
        />
        <NavLink
          to="/feed"
          icon={<ListIcon type="secondary" />}
          text="Лента заказов"
          className="ml-2"
        />
      </div>

      <Logo className={appHeaderStyles.logo} />

      <div className={appHeaderStyles.right}>
        <NavLink
          to="/profile"
          icon={<ProfileIcon type="secondary" />}
          text="Личный кабинет"
        />
      </div>
    </header>
  );
}

export default AppHeader;
