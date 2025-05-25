import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchGetOrders, getOrders } from '../../slices/orderSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getOrders);
  return <ProfileOrdersUI orders={orders} />;
};
