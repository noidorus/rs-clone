import { User } from 'firebase/auth';
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
  uploading: boolean;
}

export interface ModalState {
  ModalChildren: null | React.ElementType;
}

export interface ProfileState {
  user: IUserProfile | null | undefined;
  isFollowingProfile: boolean;
  photosLoadingStatus: Status;
  uploadLoading: boolean;
}

export interface AuthState {
  loggedUser: IUserProfile | null;
  authError: string | null;
  loading: boolean;
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
