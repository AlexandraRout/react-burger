import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../types/typed-redux-hooks';
import Tabs from '../tabs/tabs';
import IngredientsSection from '../ingredients-section/ingredients-section';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import scrollToElement from '../../utils/scroll-to-element';
import { setCurrentIngredient } from '../../services/current-ingredient/current-ingredient.slice';
import useScrollTabsCallback from '../../hooks/use-scroll-tabs-callback';
import { IIngredient, IngredientType } from '../../types';

export default function BurgerIngredients() {
  const dispatch = useAppDispatch();

  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const sections: Record<string, React.RefObject<HTMLElement | null>> = {
    [IngredientType.Bun]: useRef<HTMLElement | null>(null),
    [IngredientType.Sauce]: useRef<HTMLElement | null>(null),
    [IngredientType.Main]: useRef<HTMLElement | null>(null),
  };

  const [currentTab, setCurrentTab] = useState<string>(IngredientType.Bun);

  const { items: ingredients, isLoading, error } = useAppSelector((state) => state.burgerIngredients);

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
    scrollToElement(scrollContainer.current, sections[tab].current);
  };

  const onClickIngredient = (ingredient: IIngredient) => {
    dispatch(setCurrentIngredient(ingredient));
  };

  const onScroll = useScrollTabsCallback({
    scrollContainer,
    sections,
    onChange: setCurrentTab,
  });

  return (
    <>
      {isLoading && <p className="text text text_type_main-default">Загрузка...</p>}
      {error && <p className="text text text_type_main-default">{error}</p>}
      {ingredients.length > 0 ? (
        <section className={burgerIngredientsStyles.burger_ingredients}>
          <Tabs
            current={currentTab}
            setCurrent={(tab: string) => { handleTabClick(tab); }}
          />
          <div
            ref={scrollContainer}
            className={burgerIngredientsStyles.burger_ingredients_scroll}
            onScroll={onScroll}
          >
            <IngredientsSection ref={sections[IngredientType.Bun]} title="Булки" type={IngredientType.Bun} onClick={onClickIngredient} />
            <IngredientsSection ref={sections[IngredientType.Sauce]} title="Соусы" type={IngredientType.Sauce} onClick={onClickIngredient} />
            <IngredientsSection ref={sections[IngredientType.Main]} title="Начинки" type={IngredientType.Main} onClick={onClickIngredient} />
          </div>
        </section>
      ) : null}
    </>
  );
}
