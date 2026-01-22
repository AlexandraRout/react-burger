import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '../tabs/tabs';
import IngredientsSection from '../ingredients-section/ingredients-section';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import scrollToElement from '../../utils/scroll-to-element';
import Modal from '../../shared/components/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import useModal from '../../hooks/use-modal';
import {
  clearCurrentIngredient,
  setCurrentIngredient,
} from '../../services/current-ingredient/current-ingredient.slice';
import fetchIngredients from '../../services/burger-ingredients/burger-ingredients.thunks';
import useScrollTabsCallback from '../../hooks/use-scroll-tabs-callback';

export default function BurgerIngredients() {
  const dispatch = useDispatch();

  const scrollContainer = useRef(null);
  const sections = {
    bun: useRef(null),
    sauce: useRef(null),
    main: useRef(null),
  };

  const [currentTab, setCurrentTab] = useState('bun');
  const { isOpen, open, close } = useModal();

  const { items: ingredients, isLoading, error } = useSelector((state) => state.burgerIngredients);

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    scrollToElement(scrollContainer.current, sections[tab].current);
  };

  const onClickIngredient = (ingredient) => {
    dispatch(setCurrentIngredient(ingredient));
    open();
  };

  const onCloseIngredient = () => {
    dispatch(clearCurrentIngredient());
    close();
  };

  const onScroll = useScrollTabsCallback({
    scrollContainer,
    sections,
    onChange: setCurrentTab,
  });

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      {isLoading && <p className="text text text_type_main-default">Загрузка...</p>}
      {error && <p className="text text text_type_main-default">{error}</p>}
      {ingredients.length > 0 ? (
        <section className={burgerIngredientsStyles.burger_ingredients}>
          <Tabs
            current={currentTab}
            setCurrent={(tab) => { handleTabClick(tab); }}
          />
          <div
            ref={scrollContainer}
            className={burgerIngredientsStyles.burger_ingredients_scroll}
            onScroll={onScroll}
          >
            <IngredientsSection ref={sections.bun} title="Булки" type="bun" onClick={onClickIngredient} />
            <IngredientsSection ref={sections.sauce} title="Соусы" type="sauce" onClick={onClickIngredient} />
            <IngredientsSection ref={sections.main} title="Начинки" type="main" onClick={onClickIngredient} />
          </div>
        </section>
      ) : null}
      {isOpen && <Modal isOpen={isOpen} title="Детали ингредиента" onClose={onCloseIngredient}><IngredientDetails /></Modal>}
    </>
  );
}
