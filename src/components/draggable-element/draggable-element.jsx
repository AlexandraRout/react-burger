import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { moveIngredient } from '../../services/burger-constructor/burger-constructor.slice';
import { selectFillings } from '../../services/burger-constructor/burger-constructor.selectors';
import ingredientPropType from '../../shared/types/ingredient-prop-type';

export default function DraggableElement({ ingredient, index, children }) {
  const dispatch = useDispatch();

  const dropRef = useRef(null);
  const dragRef = useRef(null);

  const fillings = useSelector(selectFillings);

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'filling',
    item: { index, uuid: ingredient.uuid },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'filling',
    hover(item) {
      if (!dropRef.current) return;

      const from = fillings.findIndex((filling) => filling.uuid === item.uuid);
      if (from === -1 || from === index) return;

      dispatch(moveIngredient({ from, to: index }));
    },
  });

  drag(dragRef);
  drop(preview(dropRef));

  return children({
    dropRef, dragRef, isDragging, ingredient,
  });
}

DraggableElement.propTypes = {
  ingredient: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
};
