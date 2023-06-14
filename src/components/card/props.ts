import { IComment } from './../../types/types';
import { IPhotoDoc, IUserProfile } from '../../types/types';

export interface CardProps {
  photo: IPhotoDoc;
}

export interface CardModalProps {
  photo: IPhotoDoc;
  comments: IComment[];
  user: IUserProfile;
}
