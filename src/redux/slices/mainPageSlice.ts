import { IPhotoDoc } from './../../types/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPhotosByUserId } from '../../firebase/services';
import { MainState, Status } from './types';

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

const initialState: MainState = {
  photos: [],
  recomendedPhotos: [],
  photosLoadingStatus: Status.IDLE,
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
  },
});

const { actions, reducer } = mainPageSlice;

export default reducer;

export const {} = actions;
