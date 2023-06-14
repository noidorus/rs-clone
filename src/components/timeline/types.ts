import { IPhotoDoc } from './../../types/types';

export interface TimeLineProps {
  photos: IPhotoDoc[];
  title?: string;
  page: 'profile' | 'main';
}
