import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  isAuth: boolean;
  isAwaited: boolean;
  type: 'public' | 'protected';
};

export const ProtectedRoute = ({
  children,
  isAwaited,
  isAuth,
  type
}: ProtectedRouteProps) => {
  const location = useLocation();

  if (isAwaited) {
    return <Preloader />;
  }

  if (isAuth && type === 'public' && !isAwaited) {
    return <Navigate replace to='/' />;
  }

  if (!isAuth && type === 'protected' && !isAwaited) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
