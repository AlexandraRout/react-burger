import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppHeader from '../components/app-header/app-header';
import appStyles from './app.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={appStyles.app_header_layout}>
        <AppHeader />
      </div>
    </BrowserRouter>
  );
}

export default App;
