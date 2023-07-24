import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './types';
import {
  fetchUserByUserId,
  signInWithEmail,
  registerWithEmail,
  signOut,
  updateAvatar,
  updateUserInfo,
  fetchProfile,
  toggleFollow,
  toggleLoggedUserFollow,
} from './thunks/userCenterThunks';
export * from './thunks/userCenterThunks';

const initialState: AuthState = {
  userProfile: null,
  loggedUser: null,
  authError: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'userCenter',
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
      .addCase(registerWithEmail.fulfilled, (state, { payload }) => {
        state.loggedUser = payload;
        state.loading = false;
        state.authError = null;
      })
      .addCase(registerWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload as string;
      });

    builder.addCase(signOut.fulfilled, (state) => {
      state.loggedUser = null;
      state.userProfile = null;
      state.authError = null;
      state.loading = false;
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
      .addCase(updateUserInfo.pending, (state) => {
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

    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.userProfile = payload;
        state.loading = false;
      });

    builder.addCase(toggleFollow.fulfilled, (state, { payload }) => {
      if (state.loggedUser && state.userProfile) {
        state.userProfile = {
          ...state.userProfile,
          followers: payload.newFollowers,
        };

        state.loggedUser = {
          ...state.loggedUser,
          following: payload.newFollowing,
        };
      }
    });

    builder.addCase(toggleLoggedUserFollow.fulfilled, (state, { payload }) => {
      if (state.loggedUser) {
        state.loggedUser = {
          ...state.loggedUser,
          following: payload.newFollowing,
        };
      }
    });
  },
});

const { reducer, actions } = authSlice;

export default reducer;
export const { setUser } = actions;
