import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';
import { access, stat } from 'fs';
import e from 'express';

interface IUser {
  isAwaiting: boolean;
  isAuthed: boolean;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  user: TUser;
}

const initialState: IUser = {
  isAwaiting: false,
  isAuthed: false,
  accessToken: undefined,
  refreshToken: undefined,
  user: {
    email: '',
    name: ''
  }
};

export const fetchLogin = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      // const { email, password } = data
      const userData = await loginUserApi(data);
      console.log(userData);
      return userData;
    } catch (error) {
      // console.log(error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const userData = await registerUserApi(data);
      console.log(userData);
      return userData;
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchGetUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const userData = await getUserApi();
      return userData;
    } catch (error) {
      if (error as Error) console.log(error);
      return rejectWithValue((error as Error).message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  // initialState: {

  // },
  initialState,
  reducers: {
    checkAuthed: (state) => {
      const accessToken = getCookie('accessToken');
      const refreshToken = getCookie('refreshToken');
      if (accessToken != undefined || refreshToken != undefined) {
        state.isAuthed = true;
      } else {
        state.isAuthed = false;
      }
    },
    logOut: (state) => {
      state.isAuthed = false;
      console.log(state.isAuthed);
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isAwaiting = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAwaiting = false;
        state.isAuthed = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        setCookie('accessToken', state.accessToken);
        localStorage.setItem('refreshToken', state.refreshToken);
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isAuthed = false;
        console.log('Ошибка при логине');
      })
      .addCase(fetchRegister.pending, (state) => {
        state.isAwaiting = true;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAwaiting = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        setCookie('accessToken', state.accessToken);
        localStorage.setItem('refreshToken', state.refreshToken);
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        console.log('Ошибка при при регистрации');
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        // console.log('Авторизован');
      })
      .addCase(fetchGetUser.pending, (state, action) => {
        // console.log('Грузим данные пользователя');
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.isAuthed = false;
      });
  },
  selectors: {
    getAuthState: (state) => state.isAuthed,
    getUser: (state) => state.user
  }
});

export const { checkAuthed, logOut } = userSlice.actions;
export const { getAuthState, getUser } = userSlice.selectors;
export const userReducer = userSlice.reducer;
