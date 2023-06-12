import { createNewPhoto } from './../../firebase/services';
import { IPhotoDoc } from './../../types/types';
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

const uploadNewPhoto = async ({
  img,
  caption,
  userId,
  update = true,
}: UploadPhotoProps) => {
  try {
    const photo = await createNewPhoto(img, caption, userId);

    if (update) {
      return photo;
    }

    return null;
  } catch (err) {
    throw err;
  }
};

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  fetchPhotosByUserId
);

export const fetchProfilePhotos = createAsyncThunk(
  'photos/fetchProfilePhotos',
  fetchPhotosByUserId
);

export const uploadProfilePhoto = createAsyncThunk(
  'profile/uploadProfilePhoto',
  uploadNewPhoto
);

export const uploadPhoto = createAsyncThunk(
  'photos/uploadPhoto',
  uploadNewPhoto
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
      .addCase(fetchProfilePhotos.pending, (state) => {
        state.photosLoadingStatus = Status.LOADING;
      })
      .addCase(fetchProfilePhotos.fulfilled, (state, { payload }) => {
        state.photosLoadingStatus = Status.IDLE;
        state.profilePhotos = payload;
      })
      .addCase(fetchProfilePhotos.rejected, (state) => {
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

    builder
      .addCase(uploadProfilePhoto.pending, (state) => {
        state.uploading = true;
      })
      .addCase(uploadProfilePhoto.fulfilled, (state, { payload }) => {
        state.uploading = false;
        if (payload) {
          state.profilePhotos = [payload, ...state.profilePhotos];
        }
      })
      .addCase(uploadProfilePhoto.rejected, (state) => {
        state.uploading = false;
      });
  },
});

const { actions, reducer } = mainPageSlice;

export default reducer;

export const {} = actions;
