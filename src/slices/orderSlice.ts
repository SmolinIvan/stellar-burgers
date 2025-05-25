import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

interface OrderState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orders: TOrder[];
  isMakingOrder: boolean;
  currentOrder: TOrder | null;
}

const initialState: OrderState = {
  bun: null,
  ingredients: [],
  orders: [],
  isMakingOrder: false,
  currentOrder: null
};

export const fetchMakeOrder = createAsyncThunk(
  'order/makeOrder',
  async (data: string[], { rejectWithValue }) => {
    try {
      // const { email, password } = data
      const order = await orderBurgerApi(data);
      return order;
    } catch (error) {
      // console.log(error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchGetOrders = createAsyncThunk(
  'order/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      // const { email, password } = data
      const orders = await getOrdersApi();
      return orders;
    } catch (error) {
      // console.log(error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchGetOrderById = createAsyncThunk(
  'order/getOrderById',
  async (id: number, { rejectWithValue }) => {
    try {
      // const { email, password } = data
      const order = await getOrderByNumberApi(id);
      return order;
    } catch (error) {
      // console.log(error);
      return rejectWithValue((error as Error).message);
    }
  }
);
// const orderData = fetchGetOrderById(Number(id))
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    clearLastOrder: (state) => {
      state.currentOrder = null;
      state.isMakingOrder = false;
    },
    moveIngredient: {
      reducer: (
        state,
        action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
      ) => {
        const { dragIndex, hoverIndex } = action.payload;
        const newIngredients = [...state.ingredients];

        // Удаляем элемент из старой позиции
        const [movedItem] = newIngredients.splice(dragIndex, 1);
        // Вставляем в новую позицию
        newIngredients.splice(hoverIndex, 0, movedItem);

        state.ingredients = newIngredients;
      },
      prepare: (dragIndex: number, hoverIndex: number) => ({
        payload: { dragIndex, hoverIndex }
      })
    },
    swapAdjacentIngredients: {
      reducer: (
        state,
        action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
      ) => {
        const { index, direction } = action.payload;
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        // Проверяем границы массива
        if (newIndex >= 0 && newIndex < state.ingredients.length) {
          const newIngredients = [...state.ingredients];
          [newIngredients[index], newIngredients[newIndex]] = [
            newIngredients[newIndex],
            newIngredients[index]
          ];
          state.ingredients = newIngredients;
        }
      },
      prepare: (index: number, direction: 'up' | 'down') => ({
        payload: { index, direction }
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMakeOrder.fulfilled, (state, action) => {
        console.log(state.orders);
        state.orders = [...state.orders, action.payload.order];
        state.currentOrder = action.payload.order;
        state.isMakingOrder = false;
        state.ingredients = [];
        state.bun = null;
      })
      .addCase(fetchMakeOrder.pending, (state) => {
        state.isMakingOrder = true;
      })
      .addCase(fetchMakeOrder.rejected, (state) => {
        state.isMakingOrder = false;
      })
      .addCase(fetchGetOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchGetOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload.orders[0];
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getBun: (state) => state.bun,
    getOrders: (state) => state.orders,
    getCurrentOrder: (state) => state.currentOrder,
    getMakingOrderStatus: (state) => state.isMakingOrder
  }
});

export const {
  getIngredients,
  getBun,
  getOrders,
  getCurrentOrder,
  getMakingOrderStatus
} = orderSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  clearLastOrder,
  moveIngredient,
  swapAdjacentIngredients
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
