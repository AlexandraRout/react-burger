import React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import notFoundPageStyles from './not-found-page.module.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={notFoundPageStyles.not_found_page_container}>
      <div className={notFoundPageStyles.not_found_page}>
        <h1 className="text text_type_digits-large">404</h1>
        <p className="text text_type_main-medium mt-4">Страница не найдена</p>
        <p className="text text_type_main-default text_color_inactive mt-3">
          К сожалению, здесь ничего нет
        </p>

        <Button
          htmlType="button"
          type="primary"
          onClick={handleGoHome}
          size="medium"
          extraClass="mt-8"
        >
          На главную
        </Button>
      </div>
    </div>
  );
}
