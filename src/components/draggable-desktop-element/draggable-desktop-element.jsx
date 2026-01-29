import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingredientPropType from '../../shared/types/ingredient-prop-type';
import draggableDesktopElementStyles from './draggable-desktop-element.module.css';
import DraggableElement from '../draggable-element/draggable-element';

export default function DraggableDesktopElement({
  filling,
  index,
  handleClose,
}) {
  return (
    <DraggableElement ingredient={filling} index={index}>
      {({
        dropRef, dragRef, isDragging, ingredient,
      }) => (
        <div
          ref={dropRef}
          className={draggableDesktopElementStyles.element}
          style={{ opacity: isDragging ? 0.5 : 1 }}
        >
          <div ref={dragRef} className={draggableDesktopElementStyles.drag_icon_container}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={() => handleClose(ingredient)}
          />
        </div>
      )}
    </DraggableElement>
  );
}

DraggableDesktopElement.propTypes = {
  filling: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
};
