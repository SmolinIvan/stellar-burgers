import { getFeedsApi } from '@api';
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
}

const initialState: OrderState = {
  bun: null,
  ingredients: [],
  orders: []
};

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
        // Тут исправлено без return
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
    // Можно добавить другие actions по необходимости
    // например, removeIngredient, moveIngredient и т.д.
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getBun: (state) => state.bun
  }
});

export const { getIngredients, getBun } = orderSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  swapAdjacentIngredients
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
