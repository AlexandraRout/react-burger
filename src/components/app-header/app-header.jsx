import React from 'react';
import {
  Logo, ProfileIcon, BurgerIcon, ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import NavLink from '../../shared/components/link/nav-link';
import appHeaderStyles from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={appHeaderStyles.app_header}>
      <div className={appHeaderStyles.app_header_container}>
        <nav className={appHeaderStyles.nav_left}>
          <NavLink
            to="/"
            icon={<BurgerIcon type="secondary" />}
            text="Конструктор"
          />
          <NavLink
            to="/feed"
            icon={<ListIcon type="secondary" />}
            text="Лента заказов"
          />
        </nav>

        <Logo className={appHeaderStyles.logo} />

        <nav className={appHeaderStyles.nav_right}>
          <NavLink
            to="/profile"
            icon={<ProfileIcon type="secondary" />}
            text="Личный кабинет"
          />
        </nav>
      </div>
    </header>
  );
}
