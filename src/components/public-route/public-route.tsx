import { Navigate } from 'react-router-dom';

type PublicRouteProps = {
  children: React.ReactElement;
  isAuth: boolean;
};

export const PublicRoute = ({ children, isAuth }: PublicRouteProps) => {
  if (isAuth) {
    return <Navigate replace to='/' />;
  }

  return children;
};
