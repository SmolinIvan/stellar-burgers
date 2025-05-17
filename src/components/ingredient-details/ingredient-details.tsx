import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllIngredients } from '../../slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */

  const location = useLocation();
  const ingredientId = location.pathname.split('/').pop();
  const ingredientData = useSelector(selectAllIngredients).find(
    (item) => item._id === ingredientId
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
