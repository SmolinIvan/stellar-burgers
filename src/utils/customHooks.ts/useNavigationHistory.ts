import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useNavigationHistory() {
  const location = useLocation();
  const history = useRef({
    prev: '/',
    current: '/'
  });

  useEffect(() => {
    history.current = {
      prev: history.current.current,
      current: location.pathname
    };
  }, [location]);

  return history.current;
}
