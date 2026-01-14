import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '../tabs/tabs';
import IngredientsSection from '../ingredients-section/ingredients-section';
import ingredientPropType from '../../shared/types/ingredient-prop-type';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import scrollToElement from '../../utils/scroll-to-element';
import Modal from '../../shared/components/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import useModal from '../../hooks/use-modal';

export default function BurgerIngredients({ ingredients }) {
  const sections = {
    one: useRef(null),
    two: useRef(null),
    three: useRef(null),
  };
  const [currentTab, setCurrentTab] = useState('one');
  const scrollContainer = useRef(null);

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const { isOpen, open, close } = useModal();

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    scrollToElement(scrollContainer.current, sections[tab].current);
  };

  const onClickIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
    open();
  };

  return (
    <>
      <section className={burgerIngredientsStyles.burger_ingredients}>
        <Tabs
          current={currentTab}
          setCurrent={
              (tab) => { handleTabClick(tab); }
          }
        />
        <div className={burgerIngredientsStyles.ingredients_scroll} ref={scrollContainer}>
          <IngredientsSection ref={sections.one} title="Булки" type="bun" ingredients={ingredients} onClick={onClickIngredient} />
          <IngredientsSection ref={sections.two} title="Соусы" type="sauce" ingredients={ingredients} onClick={onClickIngredient} />
          <IngredientsSection ref={sections.three} title="Начинки" type="main" ingredients={ingredients} onClick={onClickIngredient} />
        </div>
      </section>
      {isOpen && <Modal isOpen={isOpen} title="Детали ингредиента" onClose={close}><IngredientDetails ingredient={selectedIngredient} /></Modal>}
    </>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};
