import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserByUserId } from '../../firebase/services';
import { AuthState } from './types';

const initialState: AuthState = {
  loggedUser: null,
  authError: null,
  authLoading: false,
};

export const fetchUserCallback = async (userId: string) => {
  const user = await getUserByUserId(userId);
  localStorage.setItem('auth-user', JSON.stringify(user));
  return user;
};

export const fetchUser = createAsyncThunk('auth/fetchUser', fetchUserCallback);

export const signIn = createAsyncThunk('auth/signIn', async () => {});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loggedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.loggedUser = payload;
    });
  },
});

const { reducer, actions } = authSlice;

export default reducer;
export const { setUser } = actions;
