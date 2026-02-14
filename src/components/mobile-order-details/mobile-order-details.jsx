import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import MobileBar from '../../shared/components/mobile-bar/mobile-bar';
import mobileOrderDetailsStyles from './mobile-order-details.module.css';
import MobileConstructorElement from '../mobile-constructor-element/mobile-constructor-element';
import { createOrder } from '../../services/order/order.thunks';
import DraggleMobileElement
  from '../draggable-mobile-element/draggle-mobile-element';
import { selectBun, selectFillings } from '../../services/burger-constructor/burger-constructor.selectors';
import { removeAllIngredientsFromConstructor } from '../../services/burger-constructor/burger-constructor.slice';

export default function MobileOrderDetails({ setIsOrdered }) {
  const dispatch = useDispatch();

  const bun = useSelector(selectBun);
  const fillings = useSelector(selectFillings);
  const { ingredients } = useSelector((state) => state.burgerConstructor);
  const { isLoading } = useSelector((state) => state.order);

  const handleCreateOrder = async () => {
    if (isLoading) return;

    const ingredientIds = ingredients.map((ingredient) => ingredient._id);
    try {
      await dispatch(createOrder(ingredientIds)).unwrap();
      setIsOrdered(true);
      dispatch(removeAllIngredientsFromConstructor());
    } catch (err) {
      console.error(err);
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

MobileOrderDetails.propTypes = {
  setIsOrdered: PropTypes.func.isRequired,
};
