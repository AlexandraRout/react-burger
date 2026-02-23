import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-redux-hooks';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {
  clearCurrentIngredient,
  setCurrentIngredient,
} from '../../services/current-ingredient/current-ingredient.slice';
import Modal from '../../shared/components/modal/modal';

export default function ModalIngredientDetails() {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const ingredients = useAppSelector((state) => state.burgerIngredients.items);
  const ingredient = ingredients.find((item) => item._id === id);

  useEffect(() => {
    dispatch(setCurrentIngredient(ingredient));
  }, [dispatch, ingredient]);

  const onCloseIngredient = () => {
    window.history.back();
    dispatch(clearCurrentIngredient());
  };

  if (!ingredients.length) return <div>Загрузка...</div>;

  return (<Modal title="Детали ингредиента" isOpen onClose={onCloseIngredient}><IngredientDetails /></Modal>);
}
