import React, { forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/typed-redux-hooks';
import IngredientsCard from '../ingredien-card/ingredien-card';
import ingredientsSectionStyles from './ingredients-section.module.css';
import { IIngredient } from '../../types';

interface IIngredientsSectionProps {
  title: string;
  type: string;
  onClick: (ingredient: IIngredient) => void;
}

const IngredientsSection = forwardRef<HTMLElement, IIngredientsSectionProps>(({ title, type, onClick }, ref) => {
  const location = useLocation();

  const ingredients = useAppSelector((state) => state.burgerIngredients.items);

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
            <Link
              to={`/ingredients/${ingredient._id}`}
              state={{ background: location }}
            >
              <IngredientsCard ingredient={ingredient} onClick={onClick} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
});

export default IngredientsSection;
