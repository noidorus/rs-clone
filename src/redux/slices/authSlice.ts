import {
  createUser,
  logInWithEmailAndPassword,
} from './../../firebase/services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserByUserId } from '../../firebase/services';
import { getAuthError } from '../../helpers/helpers';
import { AuthState, Credentials } from './types';
import { CreateUserProps } from '../../firebase/types';

const initialState: AuthState = {
  loggedUser: null,
  authError: null,
  authLoading: false,
};

const fetchUserCallback = async (userId: string) => {
  const user = await getUserByUserId(userId);
  localStorage.setItem('auth-user', JSON.stringify(user));
  return user;
};

export const fetchUser = createAsyncThunk('auth/fetchUser', fetchUserCallback);

export const signInWithEmail = createAsyncThunk(
  'auth/signIn',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      await logInWithEmailAndPassword(credentials.email, credentials.password);
      return;
    } catch (err) {
      const error = getAuthError(err);
      throw rejectWithValue(error);
    }
  }
);

export const registerWithEmail = createAsyncThunk(
  'auth/signUp',
  async (data: CreateUserProps, { rejectWithValue }) => {
    try {
      await createUser(data);
      return;
    } catch (err) {
      const error = getAuthError(err);
      throw rejectWithValue(error);
    }
  }
);

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

    builder
      .addCase(signInWithEmail.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(signInWithEmail.fulfilled, (state) => {
        state.authLoading = false;
        state.authError = null;
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.payload as string;
      });

    builder
      .addCase(registerWithEmail.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(registerWithEmail.fulfilled, (state) => {
        state.authLoading = false;
        state.authError = null;
      })
      .addCase(registerWithEmail.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.payload as string;
      });
  },
});

const { reducer, actions } = authSlice;

export default reducer;
export const { setUser } = actions;
