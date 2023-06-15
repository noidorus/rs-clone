import { IPhotoDoc } from './../../types/types';
import { IComment } from '../../types/types';
import type { Dispatch, SetStateAction } from 'react';

export interface ProviderProps {
  children: JSX.Element;
}

export enum Themes {
  dark = 'dark',
  light = 'light',
}

export interface IThemeContext {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

export interface IPostContext {
  comments: IComment[];
  loading: boolean;
  modal: JSX.Element | null;
  // photo: IPhotoDoc;
  setModal: Dispatch<SetStateAction<JSX.Element | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setNewComment: (newComment: string) => void;
}

export interface IModalContext {
  Modal: JSX.Element | null;
  setModal: (children: JSX.Element) => void;
  closeModal: () => void;
}
