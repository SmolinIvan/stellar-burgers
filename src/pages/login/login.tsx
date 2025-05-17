import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { fetchLogin, getAuthState } from '../../slices/userSlice';
import { useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isAuthed = useSelector(getAuthState);
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // dispatch(fetchLogin({ email, password }));
    // console.log(from, isAuthed);
    // if (isAuthed) {
    //   navigate(from, { replace: true });
    //   console.log(from);
    // }

    try {
      // Ждём завершения асинхронного действия
      await dispatch(fetchLogin({ email, password })).unwrap();

      // Редирект только после успешной авторизации
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  // Необходимо добавить переменную для ошибки из userSlice и положить в errorText
  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
