import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPhotosByUserId, getUserByUsername } from '../../firebase/services';
import { ProfileState, Status } from './types';

export const fetchProfilePhotos = createAsyncThunk(
  'profile/fetchPhotos',
  async (userId: string) => {
    const photos = await getPhotosByUserId(userId);
    const sortedPhotos = photos.sort((a, b) => b.dateCreated - a.dateCreated);
    return sortedPhotos;
  }
);

// export const checkFollowing = createAsyncThunk(
//   'profile/checkFollowing',
//   async () => {
//     // const;
//   }
// );

export const fetchUser = createAsyncThunk(
  'profile/fetchUser',
  async (username: string) => {
    return await getUserByUsername(username);
  }
);

const initialState: ProfileState = {
  user: null,
  photos: [],
  followers: [],
  photosLoadingStatus: Status.IDLE,
  isFollowingProfile: false,
};

const mainPageSlice = createSlice({
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

    builder
      .addCase(fetchUser.pending, (state) => {
        // state.photosLoadingStatus = Status.LOADING;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        // state.photosLoadingStatus = Status.IDLE;
        state.user = payload;
        if (payload) {
          state.followers = payload.followers;
        }
      })
      .addCase(fetchUser.rejected, (state) => {
        // state.photosLoadingStatus = Status.ERROR;
      });
  },
});

const { actions, reducer } = mainPageSlice;

export default reducer;

export const { onToggleFollow } = actions;
