import { getFeed, fetchFeedOrders } from '@slices';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '@store';

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
