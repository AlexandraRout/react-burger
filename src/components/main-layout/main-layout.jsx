import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import mainLayoutStyles from './main-layout.module.css';

function MainLayout() {
  return (
    <div className={`${mainLayoutStyles.main_layout_container} ${mainLayoutStyles.with_bottom_bar}`}>
      <AppHeader />
      <main className={mainLayoutStyles.main_layout_content}>
        <div className={mainLayoutStyles.main_layout_content_container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
