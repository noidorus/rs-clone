import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createNewPhoto,
  getPhotosByUserId,
  getUserByUsername,
} from '../../firebase/services';
import { ProfileState, Status, UploadPhotoProps } from './types';

export const fetchProfilePhotos = createAsyncThunk(
  'profile/fetchPhotos',
  async (userId: string) => {
    const photos = await getPhotosByUserId(userId);
    const sortedPhotos = photos.sort((a, b) => b.dateCreated - a.dateCreated);
    return sortedPhotos;
  }
);

export const uploadProfilePhoto = createAsyncThunk(
  'profile/uploadPhoto',
  async ({ img, caption, userId, update = true }: UploadPhotoProps) => {
    try {
      const photo = await createNewPhoto(img, caption, userId);
      return photo;
    } catch (err) {
      throw err;
    }
  }
);

export const fetchUser = createAsyncThunk(
  'profile/fetchUser',
  async (username: string) => {
    return await getUserByUsername(username);
  }
);

const initialState: ProfileState = {
  user: null,
  photos: [],
  photosLoadingStatus: Status.IDLE,
  isFollowingProfile: false,
  uploadLoading: false,
};

const profileSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    onToggleFollow: (state, payload) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfilePhotos.pending, (state) => {
        state.photosLoadingStatus = Status.LOADING;
      })
      .addCase(fetchProfilePhotos.fulfilled, (state, { payload }) => {
        state.photosLoadingStatus = Status.IDLE;
        state.photos = payload;
      })
      .addCase(fetchProfilePhotos.rejected, (state) => {
        state.photosLoadingStatus = Status.ERROR;
      });

    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });

    builder
      .addCase(uploadProfilePhoto.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(uploadProfilePhoto.fulfilled, (state, { payload }) => {
        state.uploadLoading = true;
        state.photos = [payload, ...state.photos];
      })
      .addCase(uploadProfilePhoto.rejected, (state) => {
        state.uploadLoading = false;
      });
  },
});

const { actions, reducer } = profileSlice;

export default reducer;

export const { onToggleFollow } = actions;
