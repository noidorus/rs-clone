import { IPhotoDoc } from '../../types/types';

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
