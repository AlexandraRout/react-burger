import React from 'react';
import { useSelector } from 'react-redux';
import ingredientDetailsStyles from './ingredient-details.module.css';
import NutritionalInformation from '../nutritional-information/nutritional-information';

export default function IngredientDetails() {
  const { ingredient } = useSelector((state) => state.currentIngredient);

  if (!ingredient) return <div>Загрузка...</div>;

  return (
    <div className={ingredientDetailsStyles.ingredient_details}>
      <img src={ingredient.image_large} alt={ingredient.name} width="480" height="240" className={ingredientDetailsStyles.image} />
      <p className="mt-4 text text_type_main-medium">{ingredient.name}</p>

      <NutritionalInformation
        calories={ingredient.calories}
        proteins={ingredient.proteins}
        fat={ingredient.fat}
        carbohydrates={ingredient.carbohydrates}
      />
    </div>
  );
}
