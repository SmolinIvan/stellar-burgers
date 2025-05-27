import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

interface IUser {
  isAwaiting: boolean;
  isAuthed: boolean;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  user: TUser;
  errorText: string;
}

const initialState: IUser = {
  isAwaiting: true,
  isAuthed: false,
  accessToken: undefined,
  refreshToken: undefined,
  user: {
    email: '',
    name: ''
  },
  errorText: ''
};

export const fetchLogin = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const userData = await loginUserApi(data);
      return userData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const userData = await registerUserApi(data);
      return userData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchUpdate = createAsyncThunk(
  'user/updateData',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const userData = await updateUserApi(data);
      return userData;
    } catch (error) {
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
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchLogout = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const userData = await logoutApi();
      return userData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isAwaiting = true;
        state.errorText = '';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAwaiting = false;
        state.isAuthed = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.errorText = '';
        setCookie('accessToken', state.accessToken);
        localStorage.setItem('refreshToken', state.refreshToken);
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isAwaiting = false;
        state.isAuthed = false;
        state.errorText = action.payload as string;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.isAwaiting = true;
        state.errorText = '';
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.errorText = '';
        state.isAwaiting = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        setCookie('accessToken', state.accessToken);
        localStorage.setItem('refreshToken', state.refreshToken);
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.isAwaiting = false;
        state.errorText = action.payload as string;
      })
      .addCase(fetchUpdate.pending, (state) => {
        state.errorText = '';
      })
      .addCase(fetchUpdate.fulfilled, (state, action) => {
        state.errorText = '';
        state.user = action.payload.user;
      })
      .addCase(fetchUpdate.rejected, (state, action) => {
        state.errorText = action.payload as string;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAwaiting = false;
        state.isAuthed = true;
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.isAwaiting = true;
      })
      .addCase(fetchGetUser.rejected, (state) => {
        state.isAuthed = false;
        state.isAwaiting = false;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.isAwaiting = true;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.isAwaiting = false;
        state.isAuthed = false;
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.isAwaiting = false;
      });
  },
  selectors: {
    getAuthState: (state) => state.isAuthed,
    getUser: (state) => state.user,
    getProcessAuthStatus: (state) => state.isAwaiting,
    getErrorText: (state) => state.errorText
  }
});

export const { getAuthState, getUser, getProcessAuthStatus, getErrorText } =
  userSlice.selectors;
export const userReducer = userSlice.reducer;
