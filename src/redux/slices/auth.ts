import {
  createUser,
  logInWithEmailAndPassword,
  logOut,
} from '../../firebase/services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuthError } from '../../helpers/helpers';
import { AuthState, Credentials } from './types';
import { CreateUserProps } from '../../firebase/types';

const initialState: AuthState = {
  userId: null,
  authError: null,
  loading: false,
};

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

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await logOut();
});

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
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInWithEmail.fulfilled, (state) => {
        state.loading = false;
        state.authError = null;
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload as string;
      });

    builder
      .addCase(registerWithEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerWithEmail.fulfilled, (state) => {
        state.loading = false;
        state.authError = null;
      })
      .addCase(registerWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload as string;
      });

    builder.addCase(signOut.fulfilled, (state) => {
      state.userId = null;
    });
  },
});

const { reducer, actions } = authSlice;

export default reducer;
export const { setUser } = actions;
