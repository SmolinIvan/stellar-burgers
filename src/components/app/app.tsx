import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
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
  ProtectedRoute
} from '@components';
import { useDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { clearLastOrder, fetchGetOrders, fetchIngredients } from '@slices';
import { useEffect } from 'react';
import { fetchFeedOrders } from '@slices';
import { fetchGetUser, getAuthState, getProcessAuthStatus } from '@slices';

const App = () => {
  const isAwaited = useSelector(getProcessAuthStatus);
  const isAuthed = useSelector(getAuthState);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchFeedOrders());
    dispatch(fetchGetUser());
    dispatch(fetchGetOrders());
  }, [dispatch]);
  const background = location.state?.background;
  const orderNumber = location.pathname.split('/').pop();
  const navigate = useNavigate();

  function defaultCloseModal(path: string, clearOrder?: boolean) {
    navigate(path);
    if (clearOrder) {
      dispatch(clearLastOrder());
    }
  }

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
                  onClose={() => defaultCloseModal('/')}
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
                isAwaited={isAwaited}
                isAuth={isAuthed}
                children={<Login />}
              />
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute
                isAwaited={isAwaited}
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
                isAwaited={isAwaited}
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
                isAwaited={isAwaited}
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
                isAwaited={isAwaited}
                type='protected'
                isAuth={isAuthed}
                children={<Profile />}
              />
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute
                isAwaited={isAwaited}
                type='protected'
                isAuth={isAuthed}
                children={<ProfileOrders />}
              />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute
                isAwaited={isAwaited}
                type='protected'
                isAuth={isAuthed}
                children={<OrderInfo />}
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
                  onClose={() => defaultCloseModal('/feed', true)}
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
                  onClose={() => defaultCloseModal('/')}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute
                  isAwaited={isAwaited}
                  type='protected'
                  isAuth={isAuthed}
                  children={
                    <Modal
                      title={`#${orderNumber}`}
                      onClose={() => defaultCloseModal('/profile/orders', true)}
                    >
                      <OrderInfo />
                    </Modal>
                  }
                />
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
