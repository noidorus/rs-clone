import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserByUserId,
  getUserByUsername,
  updateUserAvatar,
  updateUserData,
} from '../../firebase/services';
import { UpdateAvatarProps } from '../../firebase/types';
import { getAuthError } from '../../helpers/helpers';
import { FetchUserProps, ProfileState, UpdateUserInfoProps } from './types';

const initialState: ProfileState = {
  loggedUser: null,
  profile: null,
  isFollowingProfile: false,
  uploadLoading: false,
  err: null,
};

const getUser = async ({ key, value }: FetchUserProps) => {
  switch (key) {
    case 'username':
      return await getUserByUsername(value);

    case 'userId':
    default:
      return await getUserByUserId(value);
  }
};

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

export const fetchProfile = createAsyncThunk('profile/fetchProfile', getUser);
export const fetchUser = createAsyncThunk('profile/fetchUser', getUser);

const profileSlice = createSlice({
  name: 'userCenter',
  initialState,
  reducers: {
    onToggleFollow: (state, payload) => {},
    clearUserCenterState: (state) => {
      state.loggedUser = null;
      state.profile = null;
      state.isFollowingProfile = false;
      state.uploadLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, { payload }) => {
      state.profile = payload;
    });

    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.loggedUser = payload;
      }
    });

    builder
      .addCase(updateAvatar.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        if (state.profile && state.loggedUser) {
          state.profile = { ...state.profile, avatarData: payload };
          state.loggedUser = { ...state.loggedUser, avatarData: payload };
        }
        state.uploadLoading = false;
      })
      .addCase(updateAvatar.rejected, (state) => {
        state.uploadLoading = false;
      });

    builder
      .addCase(updateUserInfo.pending, (state, action) => {
        state.uploadLoading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
        state.uploadLoading = false;
        if (state.profile && state.loggedUser) {
          state.profile = { ...state.profile, ...payload };
          state.loggedUser = { ...state.loggedUser, ...payload };
        }
      })
      .addCase(updateUserInfo.rejected, (state) => {
        state.uploadLoading = false;
      });
  },
});

const { actions, reducer } = profileSlice;

export default reducer;

export const { onToggleFollow, clearUserCenterState } = actions;
