import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '@store';
import { useNavigate } from 'react-router-dom';
import {
  clearLastOrder,
  fetchMakeOrder,
  getAuthState,
  getBun,
  getCurrentOrder,
  getIngredients,
  getMakingOrderStatus
} from '@slices';
import { useDispatch } from '@store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthed = useSelector(getAuthState);
  const order = useSelector(getCurrentOrder);
  const constructorItems = {
    bun: useSelector(getBun),
    ingredients: useSelector(getIngredients)
  };

  const orderRequest = useSelector(getMakingOrderStatus);

  const orderModalData = order;

  const onOrderClick = async () => {
    if (!isAuthed) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const bunsIds = [constructorItems.bun].map((item) => item._id);
    const ingredientsIds = constructorItems.ingredients.map((item) => item._id);
    console.log(bunsIds, ingredientsIds);
    const allIngredientsIds = [...bunsIds, ...ingredientsIds];
    try {
      await dispatch(fetchMakeOrder(allIngredientsIds));
    } catch (error) {
      console.error('Ошибка при оформлении:', error);
    }
  };

  const closeOrderModal = () => {
    dispatch(clearLastOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
