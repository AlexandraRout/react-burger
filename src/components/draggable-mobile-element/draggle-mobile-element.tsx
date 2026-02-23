import React from 'react';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import MobileConstructorElement from '../mobile-constructor-element/mobile-constructor-element';
import draggleMobileElementStyles from './draggle-mobile-element.module.css';
import DraggableElement from '../draggable-element/draggable-element';
import { IIngredientWithUUID } from '../../types';

interface IDraggleMobileElementProps {
  filling: IIngredientWithUUID;
  index: number;
}

export default function DraggleMobileElement({ filling, index }: IDraggleMobileElementProps) {
  return (
    <DraggableElement ingredient={filling} index={index}>
      {({
        dropRef, dragRef, isDragging, ingredient,
      }) => (
        <div
          ref={dropRef}
          className={draggleMobileElementStyles.ingredient}
          style={{ opacity: isDragging ? 0.5 : 1 }}
        >
          <div ref={dragRef} className={draggleMobileElementStyles.drag_icon_container}>
            <DragIcon type="primary" className={draggleMobileElementStyles.drag_icon} />
          </div>
          <MobileConstructorElement
            image={ingredient.image}
            name={ingredient.name}
            price={ingredient.price}
          />
        </div>
      )}
    </DraggableElement>
  );
}
