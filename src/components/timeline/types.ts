import { IPhotoDoc } from './../../types/types';

export interface TimeLineProps {
  photos: IPhotoDoc[];
  zeroLengthMessage: string;
  page: 'profile' | 'main';
}
