import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  isAuth: boolean;
  type: 'public' | 'protected';
};

export const ProtectedRoute = ({
  children,
  isAuth,
  type
}: ProtectedRouteProps) => {
  const location = useLocation();

  if (isAuth && type === 'public') {
    return <Navigate replace to='/' />;
  }

  if (!isAuth && type === 'protected') {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
