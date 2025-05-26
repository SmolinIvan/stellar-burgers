import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeedOrders, getFeed } from '../../services/slices/feedSlice';
import { ordersMock } from '../../components/ui/pages/constants';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];
  const orders: TOrder[] = useSelector(getFeed);
  const dispatch = useDispatch();
  function updateFeedInfo() {
    dispatch(fetchFeedOrders());
  }

  if (!orders.length) {
    return <Preloader />;
  } else {
    return <FeedUI orders={orders} handleGetFeeds={updateFeedInfo} />;
  }
};
