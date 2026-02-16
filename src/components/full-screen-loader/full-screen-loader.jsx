import React from 'react';
import fullScreenLoaderStyles from './full-screen-loader.module.css';

function FullScreenLoader() {
  return (
    <div className={fullScreenLoaderStyles.full_screen_loader}>
      <div className={fullScreenLoaderStyles.loader_content}>
        <div className={fullScreenLoaderStyles.spinner} />
        <div className="text text text_type_main-default mt-5">Загрузка...</div>
      </div>
    </div>
  );
}

export default FullScreenLoader;
