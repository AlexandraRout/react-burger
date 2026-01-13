import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '../tabs/tabs';
import IngredientsSection from '../ingredients-section/ingredients-section';
import ingredientPropType from '../../shared/types/ingredient-prop-type';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import scrollToElement from '../../utils/scroll-to-element';

export default function BurgerIngredients({ ingredients }) {
  const sections = {
    one: useRef(null),
    two: useRef(null),
    three: useRef(null),
  };
  const [currentTab, setCurrentTab] = useState('one');
  const scrollContainer = useRef(null);

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    scrollToElement(scrollContainer.current, sections[tab].current);
  };

  return (
    <section className={burgerIngredientsStyles.burger_ingredients}>
      <Tabs
        current={currentTab}
        setCurrent={
        (tab) => { handleTabClick(tab); }
      }
      />
      <div className={burgerIngredientsStyles.ingredients_scroll} ref={scrollContainer}>
        <IngredientsSection ref={sections.one} title="Булки" type="bun" ingredients={ingredients} />
        <IngredientsSection ref={sections.two} title="Соусы" type="sauce" ingredients={ingredients} />
        <IngredientsSection ref={sections.three} title="Начинки" type="main" ingredients={ingredients} />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};
