import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUser,
  getUserByUserId,
  getUserByUsername,
  logInWithEmailAndPassword,
  logOut,
  updateFollow,
  updateUserAvatar,
  updateUserData,
} from '../../../firebase/services';

import { Credentials, UpdateUserInfoProps } from '../types';
import { CreateUserProps, UpdateAvatarProps } from '../../../firebase/types';
import { getAuthError } from '../../../helpers/helpers';

export const fetchUserByUserId = createAsyncThunk(
  'userCenter/fetchUser',
  async (userId: string) => {
    const user = await getUserByUserId(userId);
    localStorage.setItem('auth-user', JSON.stringify(user));
    return user;
  }
);

export const fetchProfile = createAsyncThunk(
  'userCenter/fetchProfile',
  async (username: string) => {
    return await getUserByUsername(username);
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

export const toggleLoggedUserFollow = createAsyncThunk(
  'userCenter/toggleLoggedUserFollow',
  updateFollow
);

export const toggleFollow = createAsyncThunk(
  'userCenter/toggleFollow',
  updateFollow
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

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await logOut();
});

export const signInWithEmail = createAsyncThunk(
  'userCenter/signIn',
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
  'userCenter/signUp',
  async (data: CreateUserProps, { rejectWithValue }) => {
    try {
      const user = await createUser(data);
      return user;
    } catch (err) {
      const error = getAuthError(err);
      throw rejectWithValue(error);
    }
  }
);
