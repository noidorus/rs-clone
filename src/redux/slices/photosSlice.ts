import { createSlice } from '@reduxjs/toolkit';
import {
  deletePhoto,
  deleteProfilePhoto,
  fetchPhotos,
  fetchProfilePhotos,
  uploadPhoto,
  uploadProfilePhoto,
} from './thunks/photosThunks';
import { MainState, Status } from './types';
export * from './thunks/photosThunks';

const initialState: MainState = {
  photos: [],
  profilePhotos: [],
  photosLoadingStatus: Status.IDLE,
  loadingStatus: Status.IDLE,
};

const mainPageSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    clearPhotosState: (state) => {
      state.photos = [];
      state.profilePhotos = [];
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

    builder
      .addCase(fetchProfilePhotos.pending, (state) => {
        state.photosLoadingStatus = Status.LOADING;
      })
      .addCase(fetchProfilePhotos.fulfilled, (state, { payload }) => {
        state.profilePhotos = payload;
        state.photosLoadingStatus = Status.IDLE;
      });

    builder
      .addCase(uploadProfilePhoto.pending, (state) => {
        state.loadingStatus = Status.LOADING;
      })
      .addCase(uploadProfilePhoto.fulfilled, (state, { payload }) => {
        state.loadingStatus = Status.IDLE;
        if (payload) {
          state.profilePhotos = [payload, ...state.profilePhotos];
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
        state.profilePhotos = state.profilePhotos.filter(
          (value) => value.docId !== payload
        );
        state.loadingStatus = Status.IDLE;
      })
      .addCase(deleteProfilePhoto.rejected, (state) => {
        state.loadingStatus = Status.ERROR;
      });
  },
});

const { actions, reducer } = mainPageSlice;

export default reducer;
export { Status };
export const { clearPhotosState } = actions;
