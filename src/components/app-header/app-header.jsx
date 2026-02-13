import React from 'react';
import {
  Logo, ProfileIcon, BurgerIcon, ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import HeaderNavLink from '../header-nav-link/header-nav-link';
import appHeaderStyles from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={appHeaderStyles.app_header}>
      <div className={appHeaderStyles.app_header_container}>
        <nav className={appHeaderStyles.nav_left}>
          <HeaderNavLink
            to="/"
            icon={BurgerIcon}
            text="Конструктор"
          />
          <HeaderNavLink
            to="/feed"
            icon={ListIcon}
            text="Лента заказов"
          />
        </nav>

        <Link to="/"><Logo className={appHeaderStyles.logo} /></Link>

        <nav className={appHeaderStyles.nav_right}>
          <HeaderNavLink
            to="/profile"
            icon={ProfileIcon}
            text="Личный кабинет"
          />
        </nav>
      </div>
    </header>
  );
}
