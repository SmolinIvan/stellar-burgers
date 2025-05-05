import { ConstructorPage, Feed, NotFound404 } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo } from '@components';
import store, { useDispatch } from '../../services/store';
import { Provider } from 'react-redux';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { useEffect } from 'react';
import { fetchAllOrders } from '../../slices/feedSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  // Стандартная функция закрытия с возвратом
  const defaultCloseHandler = () => {
    navigate(-1); // Возврат на предыдущий URL
  };

  return (
    <>
      <AppHeader />
      <div className={styles.app}>
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='*' element={<NotFound404 />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
        </Routes>
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
