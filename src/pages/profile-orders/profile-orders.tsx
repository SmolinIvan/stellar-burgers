import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { fetchGetOrders, getOrders } from '@slices';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getOrders);
  return <ProfileOrdersUI orders={orders} />;
};
