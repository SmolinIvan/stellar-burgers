import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from 'react-redux';
import { selectAllIngredients } from '../../slices/ingredientsSlice';
import { useLocation, useParams } from 'react-router-dom';
import { getFeed } from '../../slices/feedSlice';
import { fetchGetOrderById, getCurrentOrder } from '../../slices/orderSlice';
import { useDispatch } from '../../services/store';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */

  const { number } = useParams();
  const currentOrder = useSelector(getCurrentOrder);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetOrderById(Number(number)));
  }, [dispatch]);

  console.log(currentOrder);
  const orderData = useSelector(getCurrentOrder);

  const ingredients: TIngredient[] = useSelector(selectAllIngredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);
  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
