import React from 'react';
import { Outlet } from 'react-router-dom';
import simpleLayoutStyles from './simple-layout.module.css';
import AppHeader from '../app-header/app-header';

function SimpleLayout() {
  return (
    <div className={simpleLayoutStyles.simple_layout_container}>
      <AppHeader />

      <main className={simpleLayoutStyles.simple_layout_content}>
        <div className={simpleLayoutStyles.simple_layout_content_container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default SimpleLayout;
