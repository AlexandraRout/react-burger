import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import draggableDesktopElementStyles from './draggable-desktop-element.module.css';
import DraggableElement from '../draggable-element/draggable-element';
import { IIngredientWithUUID } from '../../types';

interface IDraggableDesktopElementProps {
  filling: IIngredientWithUUID;
  index: number;
  handleClose: (ingredient: IIngredientWithUUID) => void;
}

export default function DraggableDesktopElement({
  filling,
  index,
  handleClose,
}: IDraggableDesktopElementProps) {
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
