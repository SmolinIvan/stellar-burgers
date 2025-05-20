import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute,
  PublicRoute
} from '@components';
import store, { useDispatch } from '../../services/store';
import { Provider, useSelector } from 'react-redux';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { useEffect, useRef, useState } from 'react';
import { fetchAllOrders, getFeed } from '../../slices/feedSlice';
import {
  checkAuthed,
  fetchGetUser,
  getAuthState
} from '../../slices/userSlice';
import { useNavigationHistory } from '../../utils/customHooks.ts/useNavigationHistory';

const App = () => {
  const isAuthed = useSelector(getAuthState);
  const dispatch = useDispatch();
  const location = useLocation();

  // Пока не удается использовать кастомных хук useNavigationHistory с сохранением истории

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchAllOrders());
    dispatch(checkAuthed());
    dispatch(fetchGetUser());
  }, [dispatch, isAuthed]);
  const background = location.state?.background;
  const orderNumber = location.pathname.split('/').pop();
  const navigate = useNavigate();
  // console.log(location.state?.from?.pathname);

  // Стандартная функция закрытия с возвратом
  const defaultCloseIngredientHandler = () => {
    navigate('/'); // Возврат на предыдущий URL
  };

  const defaultCloseFeedOrderHandler = () => {
    navigate('/feed'); // Возврат на предыдущий URL
  };

  return (
    <>
      <AppHeader />
      <div className={styles.app}>
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />}>
            <Route
              path='ingredients/:id'
              element={
                <Modal
                  title='Детали ингридиента'
                  onClose={defaultCloseIngredientHandler}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
          </Route>
          <Route
            path='/login'
            element={
              <ProtectedRoute
                type='public'
                isAuth={isAuthed}
                children={<Login />}
              />
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute
                type='public'
                isAuth={isAuthed}
                children={<Register />}
              />
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute
                type='public'
                isAuth={isAuthed}
                children={<ForgotPassword />}
              />
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute
                type='public'
                isAuth={isAuthed}
                children={<ResetPassword />}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                type='protected'
                isAuth={isAuthed}
                children={<Profile />}
              />
            }
          />
          <Route path='*' element={<NotFound404 />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal
                  title={`#${orderNumber}`}
                  onClose={defaultCloseFeedOrderHandler}
                >
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title='Детали ингридиента'
                  onClose={defaultCloseIngredientHandler}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;

{
  /* <Route
path='/feed/:number'
element={
  <Modal title={'kek '} onClose={defaultCloseHandler}>
    <OrderInfo />
  </Modal>
}
/> */
}
