import React from 'react';
import ingredientPropType from '../../shared/types/ingredient-prop-type';
import ingredientDetailsStyles from './ingredient-details.module.css';
import NutritionalInformation from '../nutritional-information/nutritional-information';

export default function IngredientDetails({ ingredient }) {
  const {
    name, calories, proteins, fat, carbohydrates, image_large: imageLarge,
  } = ingredient;

  return (
    <div className={ingredientDetailsStyles.ingredient_details}>
      <img src={imageLarge} alt={name} width="480" height="240" className={ingredientDetailsStyles.image} />
      <p className="mt-4 text text_type_main-medium">{name}</p>
      <NutritionalInformation
        calories={calories}
        proteins={proteins}
        fat={fat}
        carbohydrates={carbohydrates}
      />
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropType.isRequired,
};
