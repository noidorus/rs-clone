import { User } from 'firebase/auth';
import { IPhotoDoc, IUserProfile } from '../../types/types';

export enum Status {
  IDLE = 'idle',
  ERROR = 'error',
  LOADING = 'loading',
}

export interface MainState {
  photos: IPhotoDoc[];
  photosLoadingStatus: Status;
  recomendedPhotos: [];
  uploadLoading: boolean;
}

export interface ModalState {
  ModalChildren: null | React.ElementType;
}

export interface ProfileState {
  user: IUserProfile | null | undefined;
  isFollowingProfile: boolean;
  photos: IPhotoDoc[];
  photosLoadingStatus: Status;
  uploadLoading: boolean;
}

export interface AuthState {
  loggedUser: IUserProfile | null;
  authError: string | null;
  authLoading: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UploadPhotoProps {
  img: File;
  caption: string;
  userId: string;
  update?: boolean;
}
