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

export interface ProfileState {
  loggedUser: IUserProfile | null;
  profile: IUserProfile | null | undefined;
  isFollowingProfile: boolean;
  uploadLoading: boolean;
  err: null | string;
}

export interface ModalState {
  ModalChildren: null | React.ElementType;
}

export interface AuthState {
  userId: string | null;
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

export interface FetchUserProps {
  key: 'username' | 'userId';
  value: string;
}

export interface UpdateUserInfoProps {
  username: string;
  fullName: string;
  docId: string;
}
