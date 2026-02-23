import React, { useEffect, useRef } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-redux-hooks';
import OrderSummary from '../order-summary/order-summary';
import { addIngredientToConstructor, removeIngredientFromConstructor } from '../../services/burger-constructor/burger-constructor.slice';
import { updateTotalPrice } from '../../services/order/order.slice';
import calculateTotalPrice from '../../utils/calculate-total-price';
import DraggableDesktopElement from '../draggable-desktop-element/draggable-desktop-element';
import BurgerConstructorEmptyState from '../burger-constructor-empty-state/burger-constructor-empty-state';
import { selectBun, selectFillings } from '../../services/burger-constructor/burger-constructor.selectors';
import Modal from '../../shared/components/modal/modal';
import OrderDetails from '../order-details/order-details';
import burgerConstructorStyles from './burger-constructor.module.css';
import { IIngredient, IIngredientWithUUID } from '../../types';

export default function BurgerConstructor() {
  const dispatch = useAppDispatch();

  const bun = useAppSelector(selectBun);
  const fillings = useAppSelector(selectFillings);
  const { ingredients } = useAppSelector((state) => state.burgerConstructor);

  useEffect(() => {
    dispatch(updateTotalPrice(calculateTotalPrice(ingredients)));
  }, [dispatch, ingredients]);

  const handleClose = (ingredient: IIngredientWithUUID) => {
    dispatch(removeIngredientFromConstructor(ingredient.uuid));
  };

  const handleDrop = ({ ingredient }: { ingredient: IIngredient }) => {
    dispatch(addIngredientToConstructor(ingredient));
  };

  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [{ isOver }, drop] = useDrop<
    { ingredient: IIngredient },
    void,
    { isOver: boolean }
  >({
    accept: 'ingredients',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop(item) {
      handleDrop(item);
    },
  });

  drop(sectionRef);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOrderCreated = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      ref={sectionRef}
      className={burgerConstructorStyles.burger_constructor}
      style={{ opacity: isOver ? 0.5 : 1 }}
    >
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
          <OrderSummary onOrderCreated={handleOrderCreated} />
        </>
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}><OrderDetails /></Modal>
      )}
    </section>
  );
}
