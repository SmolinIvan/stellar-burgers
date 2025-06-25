import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  userReducer,
  feedReducer,
  orderReducer,
  ingredientsReducer
} from '@slices';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
    feed: feedReducer,
    user: userReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
