import { createNewPhoto } from './../../firebase/services';
import { IPhotoDoc } from './../../types/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPhotosByUserId } from '../../firebase/services';
import { MainState, Status, UploadPhotoProps } from './types';

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (usersIds: string[]) => {
    const photos: IPhotoDoc[] = [];

    for (let i = 0; i < usersIds.length; i += 1) {
      const arr = await getPhotosByUserId(usersIds[i]);
      photos.push(...arr);
    }
    const sortedPhotos = photos.sort((a, b) => b.dateCreated - a.dateCreated);

    return sortedPhotos;
  }
);

export const uploadPhoto = createAsyncThunk(
  'photos/uploadPhotoWithUpdate',
  async ({ img, caption, userId, update = true }: UploadPhotoProps) => {
    try {
      const photo = await createNewPhoto(img, caption, userId);

      if (update) {
        return photo;
      }

      return null;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: MainState = {
  photos: [],
  recomendedPhotos: [],
  photosLoadingStatus: Status.IDLE,
  uploadLoading: false,
};

const mainPageSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.photosLoadingStatus = Status.LOADING;
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload }) => {
        state.photosLoadingStatus = Status.IDLE;
        state.photos = payload;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.photosLoadingStatus = Status.ERROR;
      });

    builder
      .addCase(uploadPhoto.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(uploadPhoto.fulfilled, (state, { payload }) => {
        state.uploadLoading = false;
        if (payload) {
          state.photos = [payload, ...state.photos];
        }
      })
      .addCase(uploadPhoto.rejected, (state) => {
        state.uploadLoading = false;
      });
  },
});

const { actions, reducer } = mainPageSlice;

export default reducer;

export const {} = actions;
