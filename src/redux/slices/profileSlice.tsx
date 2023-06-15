import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createNewPhoto,
  deletePhotoFromFirebase,
  getPhotosByUserId,
  getUserByUsername,
} from '../../firebase/services';
import { DeletePhotoProps } from './dashboardSlice';
import { ProfileState, UploadPhotoWithUpdateProps, Status } from './types';

const initialState: ProfileState = {
  user: null,
  userLoadingStatus: Status.IDLE,
  loadingStatus: Status.IDLE,
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

export const deleteProfilePhoto = createAsyncThunk(
  'profile/deletePhoto',
  async ({ imagePath, docId }: DeletePhotoProps) => {
    try {
      await deletePhotoFromFirebase(imagePath, docId);
      return docId;
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
      state.userLoadingStatus = Status.IDLE;
      state.loadingStatus = Status.IDLE;
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
        state.loadingStatus = Status.LOADING;
      })
      .addCase(uploadProfilePhoto.fulfilled, (state, { payload }) => {
        state.loadingStatus = Status.IDLE;
        if (payload) {
          state.photos = [payload, ...state.photos];
        }
      })
      .addCase(uploadProfilePhoto.rejected, (state) => {
        state.loadingStatus = Status.ERROR;
      });

    builder
      .addCase(deleteProfilePhoto.pending, (state) => {
        state.loadingStatus = Status.LOADING;
      })
      .addCase(deleteProfilePhoto.fulfilled, (state, { payload }) => {
        state.photos = state.photos.filter((value) => value.docId !== payload);
        state.loadingStatus = Status.IDLE;
      })
      .addCase(deleteProfilePhoto.rejected, (state) => {
        state.loadingStatus = Status.ERROR;
      });
  },
});

const { actions, reducer } = profileSlice;

export default reducer;

export const { onToggleFollow, clearUserCenterState } = actions;
