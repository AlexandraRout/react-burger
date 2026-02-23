import { ReactElement, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-redux-hooks';
import { moveIngredientInConstructor } from '../../services/burger-constructor/burger-constructor.slice';
import { selectFillings } from '../../services/burger-constructor/burger-constructor.selectors';
import { IIngredientWithUUID } from '../../types';

interface IDraggableChildProps {
  dropRef: React.RefObject<HTMLDivElement | null>;
  dragRef: React.RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  ingredient: IIngredientWithUUID;
}

interface IDraggableElementProps {
  ingredient: IIngredientWithUUID;
  index: number;
  children: (props: IDraggableChildProps) => ReactElement;
}

export default function DraggableElement({ ingredient, index, children }: IDraggableElementProps) {
  const dispatch = useAppDispatch();

  const dropRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<HTMLDivElement | null>(null);

  const fillings = useAppSelector(selectFillings);

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'filling',
    item: { index, uuid: ingredient.uuid },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'filling',
    hover(item: { index: number; uuid: string }) {
      if (!dropRef.current) return;

      const from = fillings.findIndex((filling) => filling.uuid === item.uuid);
      if (from === -1 || from === index) return;

      dispatch(moveIngredientInConstructor({ from, to: index }));
    },
  });

  drag(dragRef);
  drop(preview(dropRef));

  return (
    <>
      {children({
        dropRef, dragRef, isDragging, ingredient,
      })}
    </>
  );
}
