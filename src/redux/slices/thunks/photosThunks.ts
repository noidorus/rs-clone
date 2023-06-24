import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createNewPhoto,
  deletePhotoFromFirebase,
  getPhotosByUserIds,
} from '../../../firebase/services';
import {
  DeletePhotoProps,
  UploadPhotoProps,
  UploadPhotoWithUpdateProps,
} from '../types';

export const fetchPhotos = createAsyncThunk(
  'photos/fetchDashboardPhotos',
  getPhotosByUserIds
);

export const fetchProfilePhotos = createAsyncThunk(
  'profile/fetchPhotos',
  getPhotosByUserIds
);

export const deletePhoto = createAsyncThunk(
  'dashboard/deletePhoto',
  async ({ imagePath, docId }: DeletePhotoProps) => {
    try {
      await deletePhotoFromFirebase(imagePath, docId);
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
