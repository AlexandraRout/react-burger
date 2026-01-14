import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingredientPropType from '../../shared/types/ingredient-prop-type';
import handleEnterOrSpace from '../../utils/handle-enter-or-space';
import ingredientCardStyles from './ingredient-card.module.css';

export default function IngredientsCard({ ingredient, onClick }) {
  const {
    image, image_mobile: imageMobile, name, price,
  } = ingredient;

  return (
    <div
      role="button"
      tabIndex={0}
      className={ingredientCardStyles.ingredient_card}
      onClick={() => onClick(ingredient)}
      onKeyDown={handleEnterOrSpace(() => onClick(ingredient))}
    >
      <picture>
        <source media="(max-width: 600px)" srcSet={imageMobile} />
        <img src={image} alt={name} width="240" height="120" className={ingredientCardStyles.image} />
      </picture>
      <div className={ingredientCardStyles.price}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingredientCardStyles.name} text text_type_main-default mt-2`}>{name}</p>
      <Counter count={1} />
    </div>
  );
}

IngredientsCard.propTypes = {
  ingredient: ingredientPropType.isRequired,
  onClick: PropTypes.func.isRequired,
};
