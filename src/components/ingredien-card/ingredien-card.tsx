import React, { useRef } from 'react';
import { Button, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../types/typed-redux-hooks';
import handleEnterOrSpace from '../../utils/handle-enter-or-space';
import ingredientCardStyles from './ingredient-card.module.css';
import { addIngredientToConstructor } from '../../services/burger-constructor/burger-constructor.slice';
import { IIngredient } from '../../types';

interface IIngredientsCardProps {
  ingredient: IIngredient;
  onClick: (ingredient: IIngredient) => void;
}

export default function IngredientsCard({ ingredient, onClick }: IIngredientsCardProps) {
  const dispatch = useAppDispatch();

  const ingredients = useAppSelector((state) => state.burgerConstructor.ingredients);
  const count = ingredients.filter((item) => item._id === ingredient._id).length;

  const cardRef = useRef<HTMLDivElement | null>(null);

  const [{ isDrag }, drag] = useDrag({
    type: 'ingredients',
    item: { ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  drag(cardRef);

  const handleAddIngredient = (event: React.SyntheticEvent, item: IIngredient) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(addIngredientToConstructor(item));
  };

  return (
    <div
      ref={cardRef}
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
