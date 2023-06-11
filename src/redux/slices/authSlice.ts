import {
  createUser,
  logInWithEmailAndPassword,
  updateUserAvatar,
} from './../../firebase/services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserByUserId } from '../../firebase/services';
import { getAuthError } from '../../helpers/helpers';
import { AuthState, Credentials } from './types';
import { CreateUserProps, UpdateAvatarProps } from '../../firebase/types';

const initialState: AuthState = {
  loggedUser: null,
  authError: null,
  authLoading: false,
};

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (userId: string) => {
    const user = await getUserByUserId(userId);
    localStorage.setItem('auth-user', JSON.stringify(user));
    return user;
  }
);

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async ({ img, docId, oldAvatarPath }: UpdateAvatarProps) => {
    try {
      const data = await updateUserAvatar(img, docId, oldAvatarPath);
      return data;
    } catch (err) {
      throw err;
    }
  }
);

export const signInWithEmail = createAsyncThunk(
  'user/signIn',
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
  'user/signUp',
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
  name: 'user',
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

    builder
      .addCase(updateAvatar.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        if (state.loggedUser) {
          state.loggedUser = { ...state.loggedUser, avatarData: payload };
        }

        state.authLoading = false;
      })
      .addCase(updateAvatar.rejected, (state) => {
        state.authLoading = false;
      });
  },
});

const { reducer, actions } = authSlice;

export default reducer;
export const { setUser } = actions;
