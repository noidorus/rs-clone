import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createNewPhoto,
  getPhotosByUserId,
  getUserByUsername,
} from '../../firebase/services';
import {
  ProfileState,
  UploadPhotoProps,
  UploadPhotoWithUpdateProps,
} from './types';

const initialState: ProfileState = {
  user: null,
  loading: false,
  photos: [],
};

export const fetchProfile = createAsyncThunk(
  'profile/getchUser',
  async (username: string) => {
    return await getUserByUsername(username);
  }
);

export const fetchProfilePhotos = createAsyncThunk(
  'profile/fetchPhotos',
  async (userId: string) => {
    const photos = await getPhotosByUserId(userId);
    const sortedPhotos = photos.sort((a, b) => b.dateCreated - a.dateCreated);
    return sortedPhotos;
  }
);

export const uploadProfilePhoto = createAsyncThunk(
  'profile/uploadProfilePhoto',
  async ({
    img,
    caption,
    userId,
    update = true,
  }: UploadPhotoWithUpdateProps) => {
    try {
      const photo = await createNewPhoto(img, caption, userId);

      return update ? photo : null;
    } catch (err) {
      throw err;
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    onToggleFollow: (state, payload) => {},
    clearUserCenterState: (state) => {
      state.user = null;
      state.loading = false;
      state.photos = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, { payload }) => {
      state.user = payload;
    });

    builder.addCase(fetchProfilePhotos.fulfilled, (state, { payload }) => {
      state.photos = payload;
    });

    builder
      .addCase(uploadProfilePhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProfilePhoto.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          state.photos = [payload, ...state.photos];
        }
      })
      .addCase(uploadProfilePhoto.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { actions, reducer } = profileSlice;

export default reducer;

export const { onToggleFollow, clearUserCenterState } = actions;
