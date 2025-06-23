import {
  addIngredient,
  feedReducer,
  fetchFeedOrders,
  fetchIngredients,
  ingredientsReducer,
  orderReducer,
  removeIngredient,
  userReducer
} from '@slices';
import store from './store';
import {
  ingredientsState,
  orderState,
  feedState,
  userState,
  ingredientBun,
  ingredientMain,
  ingredientSauce,
  someIngredients,
  successGetOrders
} from './mockStore/mockData';
import { configureStore } from '@reduxjs/toolkit';

describe('Проверка store', () => {
  test('инициализируется rootReducer', () => {
    const initialState = store.getState();

    expect(initialState).toEqual({
      ingredients: ingredientsState,
      order: orderState,
      feed: feedState,
      user: userState
    });
  });

  test('вызов reducers c undefined состоянием и экшеном возвращает правильное начальное состояние', () => {
    const newUserState = userReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const newFeedState = feedReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const newIngredientsState = ingredientsReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    const newOrderState = orderReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(newUserState).toEqual(userState);
    expect(newFeedState).toEqual(feedState);
    expect(newIngredientsState).toEqual(ingredientsState);
    expect(newOrderState).toEqual(orderState);
  });

  test('вызов addIngredient добавляет булку в хранилище ', () => {
    const newOrderState = orderReducer(
      orderState,
      addIngredient(ingredientBun)
    );
    expect(newOrderState).toEqual({
      ...orderState,
      bun: {
        ...ingredientBun,
        id: expect.any(String)
      }
    });
  });

  test('вызов addIngredient добавляет соусы и котлеты в хранилище ', () => {
    let newOrderState = orderReducer(orderState, addIngredient(ingredientMain));

    newOrderState = orderReducer(newOrderState, addIngredient(ingredientSauce));

    expect(newOrderState).toEqual({
      ...newOrderState,
      ingredients: [
        {
          ...ingredientMain,
          id: expect.any(String)
        },
        {
          ...ingredientSauce,
          id: expect.any(String)
        }
      ]
    });
  });

  test('вызов addIngredient добавляет ингридиент (не булку) в хранилище, а вызов removeIngredient удаляет его', () => {
    let newOrderState = orderReducer(orderState, addIngredient(ingredientMain));
    expect(newOrderState).toEqual({
      ...orderState,
      ingredients: [
        {
          ...ingredientMain,
          id: expect.any(String)
        }
      ]
    });
    newOrderState = orderReducer(
      newOrderState,
      removeIngredient(newOrderState.ingredients[0].id)
    );
    expect(newOrderState).toEqual(orderState);
  });

  test('вызов removeIngredient удаляет необходимый элемент ', () => {
    let newOrderState = orderReducer(orderState, addIngredient(ingredientBun));
    newOrderState = orderReducer(newOrderState, addIngredient(ingredientSauce));
    newOrderState = orderReducer(newOrderState, addIngredient(ingredientMain));

    expect(newOrderState).toEqual({
      ...orderState,
      bun: {
        ...ingredientBun,
        id: expect.any(String)
      },
      ingredients: [
        { ...ingredientSauce, id: expect.any(String) },
        {
          ...ingredientMain,
          id: expect.any(String)
        }
      ]
    });

    newOrderState = orderReducer(
      newOrderState,
      removeIngredient(newOrderState.ingredients[0].id)
    );

    expect(newOrderState).toEqual({
      ...orderState,
      bun: {
        ...ingredientBun,
        id: expect.any(String)
      },
      ingredients: [
        {
          ...ingredientMain,
          id: expect.any(String)
        }
      ]
    });
  });

  test('вызов removeIngredient c несуществующим id не изменяет state ', () => {
    let newOrderState = orderReducer(orderState, addIngredient(ingredientBun));
    newOrderState = orderReducer(newOrderState, addIngredient(ingredientSauce));
    newOrderState = orderReducer(newOrderState, addIngredient(ingredientMain));

    expect(newOrderState).toEqual({
      ...orderState,
      bun: {
        ...ingredientBun,
        id: expect.any(String)
      },
      ingredients: [
        { ...ingredientSauce, id: expect.any(String) },
        {
          ...ingredientMain,
          id: expect.any(String)
        }
      ]
    });

    newOrderState = orderReducer(newOrderState, removeIngredient('-123'));
    expect(newOrderState).toEqual({
      ...orderState,
      bun: {
        ...ingredientBun,
        id: expect.any(String)
      },
      ingredients: [
        { ...ingredientSauce, id: expect.any(String) },
        {
          ...ingredientMain,
          id: expect.any(String)
        }
      ]
    });
  });
});

describe('тест ассинхронных экшенов', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  test('проверка fulfilled запроса ингридиентов fetchIngredients', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            data: someIngredients
          })
      })
    ) as jest.Mock;

    const newStore = configureStore({
      reducer: {
        ingredients: ingredientsReducer
      }
    });

    await newStore.dispatch(fetchIngredients());

    const { items, isLoading, error } = newStore.getState().ingredients;

    expect(items).toEqual(someIngredients);
    expect(isLoading).toBeFalsy;
    expect(error).toBeNull;
  });

  test('проверка rejected запроса ингридиентов fetchIngredients', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.reject()
      })
    ) as jest.Mock;

    const newStore = configureStore({
      reducer: {
        ingredients: ingredientsReducer
      }
    });

    await newStore.dispatch(fetchIngredients());

    const { items, isLoading, error } = newStore.getState().ingredients;
    expect(items).toEqual([]);
    expect(isLoading).toBeFalsy;
    expect(error).toBeNull;
  });

  test('проверка pending запроса ингридиентов fetchIngredients', async () => {
    let resolvePromise: Function;
    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => pendingPromise as Promise<Response>);

    const newStore = configureStore({
      reducer: {
        ingredients: ingredientsReducer
      }
    });

    newStore.dispatch(fetchIngredients());

    const { items, isLoading, error } = newStore.getState().ingredients;
    expect(items).toEqual([]);
    expect(isLoading).toBeTruthy;
    expect(error).toBeNull;
  });

  test('проверка fulfilled запроса ингридиентов fetchFeedOrders', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(successGetOrders)
      })
    ) as jest.Mock;

    const newStore = configureStore({
      reducer: {
        feed: feedReducer
      }
    });

    await newStore.dispatch(fetchFeedOrders());

    const { orders, isLoading, error, total, totalToday, success } =
      newStore.getState().feed;

    expect(orders).toEqual(successGetOrders.orders);
    expect(total).toEqual(successGetOrders.total);
    expect(totalToday).toEqual(successGetOrders.totalToday);
    expect(success).toBeTruthy;
    expect(isLoading).toBeFalsy;
    expect(error).toBeNull;
  });

  test('проверка rejected запроса ингридиентов fetchFeedOrders', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.reject()
      })
    ) as jest.Mock;

    const newStore = configureStore({
      reducer: {
        feed: feedReducer
      }
    });

    await newStore.dispatch(fetchFeedOrders());

    const { orders, isLoading, error, total, totalToday, success } =
      newStore.getState().feed;
    expect(orders).toEqual([]);
    expect(total).toEqual(0);
    expect(totalToday).toEqual(0);
    expect(success).toBeFalsy;
    expect(isLoading).toBeFalsy;
    expect(error).toBeNull;
  });

  test('проверка pending запроса ингридиентов fetchFeedOrders', async () => {
    let resolvePromise: Function;
    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => pendingPromise as Promise<Response>);

    const newStore = configureStore({
      reducer: {
        feed: feedReducer
      }
    });

    newStore.dispatch(fetchFeedOrders());

    const { orders, isLoading, error, total, totalToday, success } =
      newStore.getState().feed;
    expect(orders).toEqual([]);
    expect(total).toEqual(0);
    expect(totalToday).toEqual(0);
    expect(success).toBeFalsy;
    expect(isLoading).toBeFalsy;
    expect(error).toBeNull;
  });
});
