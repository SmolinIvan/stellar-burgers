import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { useDispatch } from '@store';
import { removeIngredient, swapAdjacentIngredients } from '@slices';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(swapAdjacentIngredients(index, 'down'));
    };

    const handleMoveUp = () => {
      dispatch(swapAdjacentIngredients(index, 'up'));
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
