import { createNewPhoto, deletePhotoFirebase } from '../../firebase/services';
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
  'dashboard/fetchPhotos',
  fetchPhotosByUserId
);

export interface DeletePhotoProps {
  imagePath: string;
  docId: string;
}

export const deletePhoto = createAsyncThunk(
  'dashboard/deletePhoto',
  async ({ imagePath, docId }: DeletePhotoProps) => {
    try {
      await deletePhotoFirebase(imagePath, docId);
      return docId;
    } catch (err) {
      throw err;
    }
  }
);

export const uploadPhoto = createAsyncThunk(
  'dashboard/uploadPhoto',
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
  photosLoadingStatus: Status.IDLE,
  loadingStatus: Status.IDLE,
};

const mainPageSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    clearPhotosState: (state) => {
      state.photos = [];
      state.photosLoadingStatus = Status.IDLE;
      state.loadingStatus = Status.IDLE;
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
        state.loadingStatus = Status.LOADING;
      })
      .addCase(uploadPhoto.fulfilled, (state, { payload }) => {
        state.loadingStatus = Status.IDLE;
        if (payload) {
          state.photos = [payload, ...state.photos];
        }
      })
      .addCase(uploadPhoto.rejected, (state) => {
        state.loadingStatus = Status.ERROR;
      });

    builder
      .addCase(deletePhoto.pending, (state) => {
        state.loadingStatus = Status.LOADING;
      })
      .addCase(deletePhoto.fulfilled, (state, { payload }) => {
        state.photos = state.photos.filter((value) => value.docId !== payload);
        state.loadingStatus = Status.IDLE;
      })
      .addCase(deletePhoto.rejected, (state) => {
        state.loadingStatus = Status.ERROR;
      });
  },
});

const { actions, reducer } = mainPageSlice;

export default reducer;
export type { Status };
export const { clearPhotosState } = actions;
