import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-redux-hooks';
import MobileBar from '../../shared/components/mobile-bar/mobile-bar';
import mobileOrderDetailsStyles from './mobile-order-details.module.css';
import MobileConstructorElement from '../mobile-constructor-element/mobile-constructor-element';
import { createOrder } from '../../services/order/order.thunks';
import DraggleMobileElement
  from '../draggable-mobile-element/draggle-mobile-element';
import { selectBun, selectFillings } from '../../services/burger-constructor/burger-constructor.selectors';
import { removeAllIngredientsFromConstructor } from '../../services/burger-constructor/burger-constructor.slice';

interface IMobileOrderDetailsProps {
  setIsOrdered: (value: boolean) => void;
}

export default function MobileOrderDetails({ setIsOrdered }: IMobileOrderDetailsProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const bun = useAppSelector(selectBun);
  const fillings = useAppSelector(selectFillings);
  const { ingredients } = useAppSelector((state) => state.burgerConstructor);
  const { isLoading } = useAppSelector((state) => state.order);
  const { isAuthChecked } = useAppSelector((state) => state.user);

  const handleCreateOrder = async () => {
    if (isLoading) return;

    if (isAuthChecked) {
      const ingredientIds = ingredients.map((ingredient) => ingredient._id);
      try {
        await dispatch(createOrder(ingredientIds)).unwrap();
        setIsOrdered(true);
        dispatch(removeAllIngredientsFromConstructor());
      } catch (err) {
        console.error(err);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={mobileOrderDetailsStyles.mobile_order_details}>
      {bun && (
      <MobileConstructorElement
        image={bun.image}
        name={`${bun.name} (вверх)`}
        price={bun.price}
        extraClasses={mobileOrderDetailsStyles.bun_element}
      />
      )}
      {fillings.map((filling, index) => (
        <DraggleMobileElement
          key={filling._id}
          filling={filling}
          index={index}
        />
      ))}
      {bun && (
      <MobileConstructorElement
        image={bun.image}
        name={`${bun.name} (низ)`}
        price={bun.price}
        extraClasses={mobileOrderDetailsStyles.bun_element}
      />
      )}
      <MobileBar buttonText={isLoading ? 'Обработка...' : 'Заказать'} onClick={handleCreateOrder} />
    </div>
  );
}
