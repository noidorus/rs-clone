import { UpdateAvatarProps } from '../../firebase/types';
import {
  createUser,
  getUserByUserId,
  logInWithEmailAndPassword,
  logOut,
  updateUserAvatar,
  updateUserData,
} from '../../firebase/services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuthError } from '../../helpers/helpers';
import { AuthState, Credentials, UpdateUserInfoProps } from './types';
import { CreateUserProps } from '../../firebase/types';

const initialState: AuthState = {
  loggedUser: null,
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

export const fetchUserByUserId = createAsyncThunk(
  'profile/fetchUser',
  async (userId: string) => {
    const user = await getUserByUserId(userId);
    localStorage.setItem('auth-user', JSON.stringify(user));
    return user;
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

export const updateAvatar = createAsyncThunk(
  'userCenter/updateAvatar',
  async ({ img, docId, oldAvatarPath }: UpdateAvatarProps) => {
    try {
      const data = await updateUserAvatar(img, docId, oldAvatarPath);
      return data;
    } catch (err) {
      throw err;
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'userCenter/updateInfo',
  async ({ username, fullName, docId }: UpdateUserInfoProps) => {
    try {
      await updateUserData(username, fullName, docId);
      return { username, fullName };
    } catch (err) {
      throw err;
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
    builder.addCase(fetchUserByUserId.fulfilled, (state, { payload }) => {
      state.loggedUser = payload;
    });

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
      state.loggedUser = null;
    });

    builder
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        if (state.loggedUser) {
          state.loggedUser = { ...state.loggedUser, avatarData: payload };
        }
        state.loading = false;
      })
      .addCase(updateAvatar.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(updateUserInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (state.loggedUser) {
          state.loggedUser = { ...state.loggedUser, ...payload };
        }
      })
      .addCase(updateUserInfo.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { reducer, actions } = authSlice;

export default reducer;
export const { setUser } = actions;
