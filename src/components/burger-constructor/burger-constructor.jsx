import React, { useEffect } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import burgerConstructorStyles from './burger-constructor.module.css';
import OrderSummary from '../order-summary/order-summary';
import { addIngredient, removeIngredient } from '../../services/burger-constructor/burger-constructor.slice';
import { updateTotalPrice } from '../../services/order/order.slice';
import calculateTotalPrice from '../../utils/calculate-total-price';
import DraggableDesktopElement from '../draggable-desktop-element/draggable-desktop-element';
import BurgerConstructorEmptyState from '../burger-constructor-empty-state/burger-constructor-empty-state';
import { selectBun, selectFillings } from '../../services/burger-constructor/burger-constructor.selectors';

export default function BurgerConstructor() {
  const dispatch = useDispatch();

  const bun = useSelector(selectBun);
  const fillings = useSelector(selectFillings);
  const ingredients = useSelector((state) => state.burgerConstructor.ingredients);

  useEffect(() => {
    dispatch(updateTotalPrice(calculateTotalPrice(ingredients)));
  }, [dispatch, ingredients]);

  const handleClose = (ingredient) => {
    dispatch(removeIngredient(ingredient.uuid));
  };

  const handleDrop = ({ ingredient }) => {
    dispatch(addIngredient(ingredient));
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(itemId) {
      handleDrop(itemId);
    },
  });

  return (
    <section className={burgerConstructorStyles.burger_constructor} ref={dropTarget}>
      { ingredients.length === 0 ? <BurgerConstructorEmptyState /> : (
        <>
          <div className={burgerConstructorStyles.burger_constructor_container}>
            { bun && (
            <ConstructorElement
              type="top"
              isLocked
              text={`${bun.name} (вверх)`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={burgerConstructorStyles.base_element}
            />
            )}
            <div className={burgerConstructorStyles.elements_scroll}>
              {fillings.map((filling, index) => (
                <DraggableDesktopElement
                  key={filling.uuid}
                  filling={filling}
                  index={index}
                  handleClose={handleClose}
                />
              ))}
            </div>
            { bun && (
            <ConstructorElement
              type="bottom"
              isLocked
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={burgerConstructorStyles.base_element}
            />
            )}
          </div>
          <OrderSummary />
        </>
      )}
    </section>
  );
}
