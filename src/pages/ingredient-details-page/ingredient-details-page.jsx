import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { setCurrentIngredient } from '../../services/current-ingredient/current-ingredient.slice';
import ingredientDetailsPageStyles from './ingredient-details-page.module.css';

export default function IngredientDetailsPage() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const ingredients = useSelector((state) => state.burgerIngredients.items);
  const ingredient = ingredients.find((item) => item._id === id);

  useEffect(() => {
    dispatch(setCurrentIngredient(ingredient));
  }, [dispatch, ingredient]);

  if (!ingredients.length) return <div>Загрузка...</div>;

  return (
    <div className={ingredientDetailsPageStyles.ingredient_details_page_container}>
      <h1 className="mt-6 text text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
}
