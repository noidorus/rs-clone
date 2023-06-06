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
  // recomendations: [];
  recomendedPhotos: [];
}

export interface ProfileState {
  user: IUserProfile | null | undefined;
  followers: string[];
  isFollowingProfile: boolean;
  photos: IPhotoDoc[];
  photosLoadingStatus: Status;
}

export interface AuthState {
  loggedUser: IUserProfile | null;
  authError: string | null;
  authLoading: boolean;
}
