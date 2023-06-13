import { createNewPhoto } from '../../firebase/services';
import { IPhotoDoc } from '../../types/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPhotosByUserId } from '../../firebase/services';
import { MainState, Status, UploadPhotoProps } from './types';

const fetchPhotosByUserId = async (usersIds: string[]) => {
  const photos: IPhotoDoc[] = [];

  for (let i = 0; i < usersIds.length; i += 1) {
    const arr = await getPhotosByUserId(usersIds[i]);
    photos.push(...arr);
  }
  const sortedPhotos = photos.sort((a, b) => b.dateCreated - a.dateCreated);

  return sortedPhotos;
};

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  fetchPhotosByUserId
);

export const uploadPhoto = createAsyncThunk(
  'photos/uploadPhoto',
  async ({ img, caption, userId }: UploadPhotoProps) => {
    try {
      return await createNewPhoto(img, caption, userId);
    } catch (err) {
      throw err;
    }
  }
);

const initialState: MainState = {
  photos: [],
  profilePhotos: [],
  photosLoadingStatus: Status.IDLE,
  uploading: false,
};

const mainPageSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    clearPhotosState: (state) => {
      state.photos = [];
      state.profilePhotos = [];
      state.photosLoadingStatus = Status.IDLE;
      state.uploading = false;
    },
  },
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
        state.uploading = true;
      })
      .addCase(uploadPhoto.fulfilled, (state, { payload }) => {
        state.uploading = false;
        if (payload) {
          state.photos = [payload, ...state.photos];
        }
      })
      .addCase(uploadPhoto.rejected, (state) => {
        state.uploading = false;
      });
  },
});

const { actions, reducer } = mainPageSlice;

export default reducer;

export const { clearPhotosState } = actions;
