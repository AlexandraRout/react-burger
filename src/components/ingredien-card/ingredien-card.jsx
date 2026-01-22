import React from 'react';
import { Button, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import handleEnterOrSpace from '../../utils/handle-enter-or-space';
import ingredientCardStyles from './ingredient-card.module.css';
import ingredientPropType from '../../shared/types/ingredient-prop-type';
import { addIngredient } from '../../services/burger-constructor/burger-constructor.slice';

export default function IngredientsCard({ ingredient, onClick }) {
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.burgerConstructor.ingredients);
  const count = ingredients.filter((item) => item._id === ingredient._id).length;

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredients',
    item: { ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const handleAddIngredient = (event, item) => {
    event.stopPropagation();
    dispatch(addIngredient(item));
  };

  return (
    <div
      ref={dragRef}
      role="button"
      tabIndex={0}
      className={ingredientCardStyles.ingredient_card}
      style={{ opacity: isDrag ? 0.5 : 1 }}
      onClick={() => onClick(ingredient)}
      onKeyDown={handleEnterOrSpace(() => onClick(ingredient))}
    >
      <picture>
        <source media="(max-width: 600px)" srcSet={ingredient.image_mobile} />
        <img src={ingredient.image} alt={ingredient.name} width="240" height="120" className={ingredientCardStyles.image} />
      </picture>
      <div className={ingredientCardStyles.price}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingredientCardStyles.name} text text_type_main-default mt-2`}>{ingredient.name}</p>
      <Button
        htmlType="button"
        type="secondary"
        size="medium"
        extraClass={ingredientCardStyles.add_button}
        onClick={(event) => handleAddIngredient(event, ingredient)}
      >
        Добавить
      </Button>
      {count ? <Counter count={count} /> : null}
    </div>
  );
}

IngredientsCard.propTypes = {
  ingredient: ingredientPropType.isRequired,
  onClick: PropTypes.func.isRequired,
};
