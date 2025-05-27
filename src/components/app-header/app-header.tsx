import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUser } from '@slices';
import { useSelector } from '@store';

export const AppHeader: FC = () => {
  const userName = useSelector(getUser);
  return <AppHeaderUI userName={userName.name} />;
};
