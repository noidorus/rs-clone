import { IComment } from '../../types/types';

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

export interface ICommentsContext {
  comments: IComment[];
  setNewComment: (newComment: IComment) => void;
}

export interface IModalContext {
  Modal: JSX.Element | null;
  setModal: (children: JSX.Element) => void;
  closeModal: () => void;
}
