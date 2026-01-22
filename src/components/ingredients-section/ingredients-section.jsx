import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import IngredientsCard from '../ingredien-card/ingredien-card';
import ingredientsSectionStyles from './ingredients-section.module.css';

const IngredientsSection = forwardRef(({ title, type, onClick }, ref) => {
  const ingredients = useSelector((state) => state.burgerIngredients.items);

  const filteredIngredients = ingredients.filter(
    (item) => item.type === type,
  );

  if (!filteredIngredients.length) {
    return null;
  }

  return (
    <section ref={ref} className="pt-10 pr-5">
      <h2 className="text text_type_main-medium mb-6">
        {title}
      </h2>
      <ul className={ingredientsSectionStyles.list}>
        {filteredIngredients.map((ingredient) => (
          <li key={ingredient._id}>
            <IngredientsCard ingredient={ingredient} onClick={onClick} />
          </li>
        ))}
      </ul>
    </section>
  );
});

IngredientsSection.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientsSection;
