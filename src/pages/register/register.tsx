import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import {
  fetchGetOrders,
  fetchLogin,
  fetchRegister,
  getErrorText
} from '@slices';
import { useDispatch, useSelector } from '@store';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errorText = useSelector(getErrorText);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchRegister({ email, name: userName, password }))
      .then(() => dispatch(fetchLogin({ email, password })))
      .then(() => dispatch(fetchGetOrders()));
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
