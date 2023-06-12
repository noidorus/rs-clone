import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createNewPhoto,
  getPhotosByUserId,
  getUserByUsername,
  updateUserAvatar,
} from '../../firebase/services';
import { UpdateAvatarProps } from '../../firebase/types';
import { ProfileState, Status, UploadPhotoProps } from './types';

// export const uploadProfilePhoto = createAsyncThunk(
//   'profile/uploadPhoto',
//   async ({ img, caption, userId, update = true }: UploadPhotoProps) => {
//     try {
//       const photo = await createNewPhoto(img, caption, userId);
//       return photo;
//     } catch (err) {
//       throw err;
//     }
//   }
// );

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async ({ img, docId, oldAvatarPath }: UpdateAvatarProps) => {
    try {
      const data = await updateUserAvatar(img, docId, oldAvatarPath);
      return data;
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
    // builder
    //   .addCase(fetchProfilePhotos.pending, (state) => {
    //     state.photosLoadingStatus = Status.LOADING;
    //   })
    //   .addCase(fetchProfilePhotos.fulfilled, (state, { payload }) => {
    //     state.photosLoadingStatus = Status.IDLE;
    //     state.photos = payload;
    //   })
    //   .addCase(fetchProfilePhotos.rejected, (state) => {
    //     state.photosLoadingStatus = Status.ERROR;
    //   });

    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });

    // builder
    //   .addCase(uploadProfilePhoto.pending, (state) => {
    //     state.uploadLoading = true;
    //   })
    //   .addCase(uploadProfilePhoto.fulfilled, (state, { payload }) => {
    //     state.uploadLoading = true;
    //     state.photos = [payload, ...state.photos];
    //   })
    //   .addCase(uploadProfilePhoto.rejected, (state) => {
    //     state.uploadLoading = false;
    //   });

    builder
      .addCase(updateAvatar.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        if (state.user) {
          state.user = { ...state.user, avatarData: payload };
        }

        state.uploadLoading = false;
      })
      .addCase(updateAvatar.rejected, (state) => {
        state.uploadLoading = false;
      });
  },
});

const { actions, reducer } = profileSlice;

export default reducer;

export const { onToggleFollow } = actions;
