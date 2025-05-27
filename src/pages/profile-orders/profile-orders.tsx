import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '@store';
import { getOrders } from '@slices';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getOrders);
  return <ProfileOrdersUI orders={orders} />;
};
