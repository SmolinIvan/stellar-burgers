import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { fetchLogin, getAuthState, getErrorText } from '../../slices/userSlice';
import { useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchGetOrders } from '../../slices/orderSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errorText = useSelector(getErrorText);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(fetchLogin({ email, password })).unwrap();
      dispatch(fetchGetOrders()).unwrap();
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
