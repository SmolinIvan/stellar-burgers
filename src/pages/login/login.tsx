import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { fetchGetOrders, fetchLogin, getErrorText } from '@slices';
import { error } from 'console';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errorText = useSelector(getErrorText);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(fetchLogin({ email, password })).then(() =>
      dispatch(fetchGetOrders())
    );
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
