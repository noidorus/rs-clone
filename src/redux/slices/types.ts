import { IPhotoDoc, IUserProfile } from '../../types/types';

export enum Status {
  IDLE = 'idle',
  ERROR = 'error',
  LOADING = 'loading',
}

export interface MainState {
  photos: IPhotoDoc[];
  profilePhotos: IPhotoDoc[];
  photosLoadingStatus: Status;
  loadingStatus: Status;
}

export interface ProfileState {
  user: IUserProfile | null | undefined;
  userLoadingStatus: Status;
  loadingStatus: Status;
  photos: IPhotoDoc[];
}

export interface AuthState {
  userProfile: IUserProfile | null | undefined;
  loggedUser: IUserProfile | null;
  authError: string | null;
  loading: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UploadPhotoWithUpdateProps extends UploadPhotoProps {
  update?: boolean;
}

export interface UploadPhotoProps {
  img: File;
  caption: string;
  userId: string;
}

export interface DeletePhotoProps {
  imagePath: string;
  docId: string;
}

export interface UpdateUserInfoProps {
  username: string;
  fullName: string;
  docId: string;
}
