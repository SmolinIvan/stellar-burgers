import {
  addIngredient,
  feedReducer,
  fetchFeedOrders,
  fetchGetOrderById,
  fetchGetOrders,
  fetchGetUser,
  fetchIngredients,
  fetchLogin,
  fetchLogout,
  fetchMakeOrder,
  fetchRegister,
  fetchUpdate,
  ingredientsReducer,
  orderReducer,
  removeIngredient,
  userReducer
} from '@slices';
import store from './store';
import {
  loginDataRequest,
  orderByIdDataRequest,
  feedDataRequest,
  ordersDataRequest,
  makeOrderDataRequest,
  userDataRequest
} from './fixtures/requestMock';
import { configureStore } from '@reduxjs/toolkit';
import {
  ingredientsState,
  orderState,
  feedState,
  unauthorizedUserState,
  authorizedUserState
} from './fixtures/statesMock';
import {
  ingredientBun,
  ingredientMain,
  ingredientSauce,
  someIngredients
} from './fixtures/ingredientsMock';
import { error } from 'console';
import * as cookie from '../utils/cookie';
import * as api from '../utils/burger-api';
import { loginUserApi } from '../utils/burger-api';

describe('Проверка store', () => {
  test('инициализируется rootReducer', () => {
    const initialState = store.getState();

    expect(initialState).toEqual({
      ingredients: ingredientsState,
      order: orderState,
      feed: feedState,
      user: unauthorizedUserState
    });
  });

  test('вызов reducers c undefined состоянием и экшеном возвращает правильное начальное состояние', () => {
    const newUserState = userReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const newFeedState = feedReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const newIngredientsState = ingredientsReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    const newOrderState = orderReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(newUserState).toEqual(unauthorizedUserState);
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

describe('тест асинхронных экшенов', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.useRealTimers();
  });
  describe('проверка запроса ингридиентов fetchIngredients', () => {
    test('fulfilled', async () => {
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
      expect(isLoading).toBeFalsy();
      expect(error).toBeNull;
    });

    test('rejected ', async () => {
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
      expect(isLoading).toBeFalsy();
      expect(error).toBeNull;
    });

    test('pending ', async () => {
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
  });
  describe('проверка запроса заказов fetchFeedOrders', () => {
    test('fulfilled ', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(feedDataRequest)
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

      expect(orders).toEqual(feedDataRequest.orders);
      expect(total).toEqual(feedDataRequest.total);
      expect(totalToday).toEqual(feedDataRequest.totalToday);
      expect(success).toBeTruthy;
      expect(isLoading).toBeFalsy();
      expect(error).toBeNull;
    });

    test('rejected', async () => {
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
      expect(success).toBeFalsy();
      expect(isLoading).toBeFalsy();
      expect(error).toBeNull;
    });

    test('pending', async () => {
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
      expect(success).toBeFalsy();
      expect(isLoading).toBeTruthy();
      expect(error).toBeNull;
    });
  });

  describe('проверка запроса оформления заказа fetchMakeOrder', () => {
    test('fulfilled', async () => {
      jest
        .spyOn(cookie, 'getCookie')
        .mockReturnValueOnce('mocked-access-token');
      jest
        .spyOn(api, 'fetchWithRefresh')
        .mockResolvedValueOnce(makeOrderDataRequest);

      const newStore = configureStore({
        reducer: {
          order: orderReducer
        },
        preloadedState: {
          order: {
            bun: ingredientBun,
            ingredients: [
              { ...ingredientSauce, id: '1' },
              { ...ingredientMain, id: '2' }
            ],
            orders: ordersDataRequest.orders,
            isMakingOrder: false,
            currentOrder: null
          }
        }
      });

      await newStore.dispatch(
        fetchMakeOrder([
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0942'
        ])
      );

      const { bun, ingredients, orders, isMakingOrder, currentOrder } =
        newStore.getState().order;

      expect(orders).toEqual([
        ...ordersDataRequest.orders,
        makeOrderDataRequest.order
      ]);
      expect(currentOrder).toEqual(makeOrderDataRequest.order);
      expect(isMakingOrder).toBeFalsy();
      expect(bun).toBeNull;
      expect(ingredients).toEqual([]);
    });

    test('rejected', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.reject()
        })
      ) as jest.Mock;

      const newStore = configureStore({
        reducer: {
          order: orderReducer
        },
        preloadedState: {
          order: {
            bun: ingredientBun,
            ingredients: [
              { ...ingredientSauce, id: '1' },
              { ...ingredientMain, id: '2' }
            ],
            orders: ordersDataRequest.orders,
            isMakingOrder: false,
            currentOrder: null
          }
        }
      });

      await newStore.dispatch(
        fetchMakeOrder([
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0942'
        ])
      );

      const { bun, ingredients, orders, isMakingOrder, currentOrder } =
        newStore.getState().order;

      expect(orders).toEqual(ordersDataRequest.orders);
      expect(currentOrder).toEqual(null);
      expect(isMakingOrder).toBeFalsy();
      expect(bun).toEqual(ingredientBun);
      expect(ingredients).toEqual([
        { ...ingredientSauce, id: '1' },
        { ...ingredientMain, id: '2' }
      ]);
    });

    test('pending', async () => {
      let resolvePromise: Function;
      const pendingPromise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      jest
        .spyOn(global, 'fetch')
        .mockImplementation(() => pendingPromise as Promise<Response>);

      const newStore = configureStore({
        reducer: {
          order: orderReducer
        },
        preloadedState: {
          order: {
            bun: ingredientBun,
            ingredients: [
              { ...ingredientSauce, id: '1' },
              { ...ingredientMain, id: '2' }
            ],
            orders: ordersDataRequest.orders,
            isMakingOrder: false,
            currentOrder: null
          }
        }
      });

      await newStore.dispatch(
        fetchMakeOrder([
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0942'
        ])
      );

      const { bun, ingredients, orders, isMakingOrder, currentOrder } =
        newStore.getState().order;

      expect(orders).toEqual(ordersDataRequest.orders);
      expect(currentOrder).toEqual(null);
      expect(isMakingOrder).toBeTruthy;
      expect(bun).toEqual(ingredientBun);
      expect(ingredients).toEqual([
        { ...ingredientSauce, id: '1' },
        { ...ingredientMain, id: '2' }
      ]);
    });
  });

  describe('проверка запроса заказов пользователя fetchGetOrders', () => {
    test('fulfilled', async () => {
      jest
        .spyOn(cookie, 'getCookie')
        .mockReturnValueOnce('mocked-access-token');
      jest
        .spyOn(api, 'fetchWithRefresh')
        .mockResolvedValueOnce(ordersDataRequest);

      const newStore = configureStore({
        reducer: {
          order: orderReducer
        },
        preloadedState: {
          order: orderState
        }
      });

      await newStore.dispatch(fetchGetOrders());

      const { bun, ingredients, orders, isMakingOrder, currentOrder } =
        newStore.getState().order;

      expect(orders).toEqual(ordersDataRequest.orders);
      expect(currentOrder).toEqual(orderState.currentOrder);
      expect(isMakingOrder).toEqual(orderState.isMakingOrder);
      expect(bun).toEqual(orderState.bun);
      expect(ingredients).toEqual(orderState.ingredients);
    });
  });

  describe('проверка запроса заказов пользователя fetchGetOrderById', () => {
    test('fulfilled', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(orderByIdDataRequest)
        })
      ) as jest.Mock;

      const newStore = configureStore({
        reducer: {
          order: orderReducer
        },
        preloadedState: {
          order: {
            bun: ingredientBun,
            ingredients: [
              { ...ingredientSauce, id: '1' },
              { ...ingredientMain, id: '2' }
            ],
            orders: ordersDataRequest.orders,
            isMakingOrder: false,
            currentOrder: null
          }
        }
      });
      await newStore.dispatch(fetchGetOrderById(82559));

      const { bun, ingredients, orders, isMakingOrder, currentOrder } =
        newStore.getState().order;

      expect(orders).toEqual(ordersDataRequest.orders);
      expect(currentOrder).toEqual(orderByIdDataRequest.orders[0]);
      expect(isMakingOrder).toBeFalsy();
      expect(bun).toEqual(ingredientBun);
      expect(ingredients).toEqual([
        { ...ingredientSauce, id: '1' },
        { ...ingredientMain, id: '2' }
      ]);
    });
  });

  describe('проверка запроса на авторизацию пользователя fetchLogin', () => {
    test('fulfilled', async () => {
      Object.defineProperty(global, 'document', {
        value: {
          cookie: ''
        },
        writable: true
      });
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(loginDataRequest)
        })
      ) as jest.Mock;

      const newStore = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: unauthorizedUserState
        }
      });

      await newStore.dispatch(
        fetchLogin({
          email: loginDataRequest.user.email,
          password: 'password'
        })
      );

      const {
        isAwaiting,
        isAuthed,
        accessToken,
        refreshToken,
        user,
        errorText
      } = newStore.getState().user;

      expect(isAwaiting).toBeFalsy();
      expect(isAuthed).toBeTruthy();
      expect(accessToken).toEqual(loginDataRequest.accessToken);
      expect(refreshToken).toEqual(loginDataRequest.refreshToken);
      expect(user).toEqual(loginDataRequest.user);
      expect(errorText).toEqual(unauthorizedUserState.errorText);
    });

    test('rejected', async () => {
      Object.defineProperty(global, 'document', {
        value: {
          cookie: ''
        },
        writable: true
      });
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.reject({
              success: false,
              message: 'Что-то, где-то пошло не так'
            })
        })
      ) as jest.Mock;

      const newStore = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: unauthorizedUserState
        }
      });

      await newStore.dispatch(
        fetchLogin({
          email: loginDataRequest.user.email,
          password: 'password'
        })
      );

      const {
        isAwaiting,
        isAuthed,
        accessToken,
        refreshToken,
        user,
        errorText
      } = newStore.getState().user;

      expect(isAwaiting).toBeFalsy();
      expect(isAuthed).toBeFalsy();
      expect(accessToken).toEqual(unauthorizedUserState.accessToken);
      expect(refreshToken).toEqual(unauthorizedUserState.refreshToken);
      expect(user).toEqual(unauthorizedUserState.user);
      expect(errorText).toEqual('Что-то, где-то пошло не так');
    });
    test('pending ', async () => {
      let resolvePromise: Function;
      const pendingPromise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      jest
        .spyOn(global, 'fetch')
        .mockImplementation(() => pendingPromise as Promise<Response>);

      const newStore = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: unauthorizedUserState
        }
      });

      newStore.dispatch(
        fetchLogin({
          email: loginDataRequest.user.email,
          password: 'password'
        })
      );

      const {
        isAwaiting,
        isAuthed,
        accessToken,
        refreshToken,
        user,
        errorText
      } = newStore.getState().user;

      expect(isAwaiting).toBeTruthy();
      expect(isAuthed).toBeFalsy();
      expect(accessToken).toEqual(unauthorizedUserState.accessToken);
      expect(refreshToken).toEqual(unauthorizedUserState.refreshToken);
      expect(user).toEqual(unauthorizedUserState.user);
      expect(errorText).toEqual(unauthorizedUserState.errorText);
    });
  });
  describe('проверка запроса на авторизацию fetchRegister', () => {
    test('fulfilled', async () => {
      Object.defineProperty(global, 'document', {
        value: {
          cookie: ''
        },
        writable: true
      });
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(loginDataRequest)
        })
      ) as jest.Mock;

      const newStore = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: unauthorizedUserState
        }
      });

      await newStore.dispatch(
        fetchRegister({
          email: loginDataRequest.user.email,
          name: loginDataRequest.user.name,
          password: 'password'
        })
      );

      const {
        isAwaiting,
        isAuthed,
        accessToken,
        refreshToken,
        user,
        errorText
      } = newStore.getState().user;

      expect(isAwaiting).toBeFalsy();
      expect(isAuthed).toBeFalsy(); // тут настроена авторизация сразу после регистрации, поэтому оставляю False (на самом деле реализовать в проекте можно по разному, но я изначально сделал такую логику)
      expect(accessToken).toEqual(loginDataRequest.accessToken);
      expect(refreshToken).toEqual(loginDataRequest.refreshToken);
      expect(user).toEqual(loginDataRequest.user);
      expect(errorText).toEqual(unauthorizedUserState.errorText);
    });

    test('rejected', async () => {
      Object.defineProperty(global, 'document', {
        value: {
          cookie: ''
        },
        writable: true
      });
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.reject({
              success: false,
              message: 'Что-то, где-то пошло не так'
            })
        })
      ) as jest.Mock;

      const newStore = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: unauthorizedUserState
        }
      });

      await newStore.dispatch(
        fetchRegister({
          email: loginDataRequest.user.email,
          name: loginDataRequest.user.name,
          password: 'password'
        })
      );

      const {
        isAwaiting,
        isAuthed,
        accessToken,
        refreshToken,
        user,
        errorText
      } = newStore.getState().user;

      expect(isAwaiting).toBeFalsy();
      expect(isAuthed).toBeFalsy();
      expect(accessToken).toEqual(unauthorizedUserState.accessToken);
      expect(refreshToken).toEqual(unauthorizedUserState.refreshToken);
      expect(user).toEqual(unauthorizedUserState.user);
      expect(errorText).toEqual('Что-то, где-то пошло не так');
    });

    test('pending', async () => {
      let resolvePromise: Function;
      const pendingPromise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      jest
        .spyOn(global, 'fetch')
        .mockImplementation(() => pendingPromise as Promise<Response>);

      const newStore = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: unauthorizedUserState
        }
      });

      newStore.dispatch(
        fetchRegister({
          email: loginDataRequest.user.email,
          name: loginDataRequest.user.name,
          password: 'password'
        })
      );

      const {
        isAwaiting,
        isAuthed,
        accessToken,
        refreshToken,
        user,
        errorText
      } = newStore.getState().user;

      expect(isAwaiting).toBeTruthy();
      expect(isAuthed).toBeFalsy();
      expect(accessToken).toEqual(unauthorizedUserState.accessToken);
      expect(refreshToken).toEqual(unauthorizedUserState.refreshToken);
      expect(user).toEqual(unauthorizedUserState.user);
      expect(errorText).toEqual(unauthorizedUserState.errorText);
    });
  });
  describe('проверка запроса на обновление данных fetchUpdate', () => {
    test('fulfilled', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(loginDataRequest)
        })
      ) as jest.Mock;

      const newStore = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: authorizedUserState
        }
      });

      await newStore.dispatch(
        fetchUpdate({
          email: loginDataRequest.user.email,
          name: loginDataRequest.user.name,
          password: 'password'
        })
      );

      const {
        isAwaiting,
        isAuthed,
        accessToken,
        refreshToken,
        user,
        errorText
      } = newStore.getState().user;

      expect(isAwaiting).toBeFalsy();
      expect(isAuthed).toBeTruthy(); // тут настроена авторизация сразу после регистрации, поэтому оставляю False (на самом деле реализовать в проекте можно по разному, но я изначально сделал такую логику)
      expect(accessToken).toEqual(authorizedUserState.accessToken);
      expect(refreshToken).toEqual(authorizedUserState.refreshToken);
      expect(user).toEqual(loginDataRequest.user);
      expect(errorText).toEqual(unauthorizedUserState.errorText);
    });

    test('rejected', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.reject({
              success: false,
              message: 'Что-то, где-то пошло не так'
            })
        })
      ) as jest.Mock;

      const newStore = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: authorizedUserState
        }
      });

      await newStore.dispatch(
        fetchRegister({
          email: loginDataRequest.user.email,
          name: loginDataRequest.user.name,
          password: 'password'
        })
      );

      const {
        isAwaiting,
        isAuthed,
        accessToken,
        refreshToken,
        user,
        errorText
      } = newStore.getState().user;

      expect(isAwaiting).toBeFalsy();
      expect(isAuthed).toBeTruthy();
      expect(accessToken).toEqual(authorizedUserState.accessToken);
      expect(refreshToken).toEqual(authorizedUserState.refreshToken);
      expect(user).toEqual(authorizedUserState.user);
      expect(errorText).toEqual('Что-то, где-то пошло не так');
    });

    test('pending', async () => {
      let resolvePromise: Function;
      const pendingPromise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      jest
        .spyOn(global, 'fetch')
        .mockImplementation(() => pendingPromise as Promise<Response>);

      const newStore = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: authorizedUserState
        }
      });

      newStore.dispatch(
        fetchUpdate({
          email: loginDataRequest.user.email,
          name: loginDataRequest.user.name,
          password: 'password'
        })
      );

      const {
        isAwaiting,
        isAuthed,
        accessToken,
        refreshToken,
        user,
        errorText
      } = newStore.getState().user;

      expect(isAwaiting).toBeFalsy();
      expect(isAuthed).toBeTruthy();
      expect(accessToken).toEqual(authorizedUserState.accessToken);
      expect(refreshToken).toEqual(authorizedUserState.refreshToken);
      expect(user).toEqual(authorizedUserState.user);
      expect(errorText).toEqual(authorizedUserState.errorText);
    });
  });
  describe('проверка запроса за данными пользователя fetchGetUser', () => {
    test('fulfilled', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(userDataRequest)
        })
      ) as jest.Mock;

      const newStore = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: unauthorizedUserState
        }
      });

      await newStore.dispatch(fetchGetUser());

      const {
        isAwaiting,
        isAuthed,
        accessToken,
        refreshToken,
        user,
        errorText
      } = newStore.getState().user;

      expect(isAwaiting).toBeFalsy();
      expect(isAuthed).toBeTruthy(); // тут настроена авторизация сразу после регистрации, поэтому оставляю False (на самом деле реализовать в проекте можно по разному, но я изначально сделал такую логику)
      expect(accessToken).toEqual(unauthorizedUserState.accessToken);
      expect(refreshToken).toEqual(unauthorizedUserState.refreshToken);
      expect(user).toEqual(userDataRequest.user);
      expect(errorText).toEqual(unauthorizedUserState.errorText);
    });

    test('rejected', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.reject({
              success: false,
              message: 'Что-то, где-то пошло не так'
            })
        })
      ) as jest.Mock;

      const newStore = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: unauthorizedUserState
        }
      });

      await newStore.dispatch(fetchGetUser());

      const {
        isAwaiting,
        isAuthed,
        accessToken,
        refreshToken,
        user,
        errorText
      } = newStore.getState().user;

      expect(isAwaiting).toBeFalsy();
      expect(isAuthed).toBeFalsy();
      expect(accessToken).toEqual(unauthorizedUserState.accessToken);
      expect(refreshToken).toEqual(unauthorizedUserState.refreshToken);
      expect(user).toEqual(unauthorizedUserState.user);
      expect(errorText).toEqual(unauthorizedUserState.errorText);
    });

    test('pending', async () => {
      let resolvePromise: Function;
      const pendingPromise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      jest
        .spyOn(global, 'fetch')
        .mockImplementation(() => pendingPromise as Promise<Response>);

      const newStore = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: unauthorizedUserState
        }
      });

      newStore.dispatch(fetchGetUser());

      const {
        isAwaiting,
        isAuthed,
        accessToken,
        refreshToken,
        user,
        errorText
      } = newStore.getState().user;

      expect(isAwaiting).toBeTruthy();
      expect(isAuthed).toBeFalsy();
      expect(accessToken).toEqual(unauthorizedUserState.accessToken);
      expect(refreshToken).toEqual(unauthorizedUserState.refreshToken);
      expect(user).toEqual(unauthorizedUserState.user);
      expect(errorText).toEqual(unauthorizedUserState.errorText);
    });
  });
  describe('проверка запроса разлогина fetchLogout', () => {
    test('fulfilled', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true })
        })
      ) as jest.Mock;

      const newStore = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: authorizedUserState
        }
      });

      await newStore.dispatch(fetchLogout());

      const {
        isAwaiting,
        isAuthed,
        accessToken,
        refreshToken,
        user,
        errorText
      } = newStore.getState().user;

      expect(isAwaiting).toBeFalsy();
      expect(isAuthed).toBeFalsy(); 
      expect(accessToken).toEqual(unauthorizedUserState.accessToken);
      expect(refreshToken).toEqual(unauthorizedUserState.refreshToken);
      expect(user).toEqual(unauthorizedUserState.user);
      expect(errorText).toEqual(unauthorizedUserState.errorText);
    });

    test('rejected', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.reject({
              success: false,
              message: 'Что-то, где-то пошло не так'
            })
        })
      ) as jest.Mock;

      const newStore = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: authorizedUserState
        }
      });

      await newStore.dispatch(fetchLogout());

      const {
        isAwaiting,
        isAuthed,
        accessToken,
        refreshToken,
        user,
        errorText
      } = newStore.getState().user;

      expect(isAwaiting).toBeFalsy();
      expect(isAuthed).toBeFalsy();
      expect(accessToken).toEqual(authorizedUserState.accessToken);
      expect(refreshToken).toEqual(authorizedUserState.refreshToken);
      expect(user).toEqual(authorizedUserState.user);
      expect(errorText).toEqual('Что-то, где-то пошло не так');
    });

    test('pending', async () => {
      let resolvePromise: Function;
      const pendingPromise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      jest
        .spyOn(global, 'fetch')
        .mockImplementation(() => pendingPromise as Promise<Response>);

      const newStore = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: authorizedUserState
        }
      });

      newStore.dispatch(fetchLogout());

      const {
        isAwaiting,
        isAuthed,
        accessToken,
        refreshToken,
        user,
        errorText
      } = newStore.getState().user;

      expect(isAwaiting).toBeTruthy();
      expect(isAuthed).toEqual(authorizedUserState.isAuthed);
      expect(accessToken).toEqual(authorizedUserState.accessToken);
      expect(refreshToken).toEqual(authorizedUserState.refreshToken);
      expect(user).toEqual(authorizedUserState.user);
      expect(errorText).toEqual(authorizedUserState.errorText);
    });
  });
});
