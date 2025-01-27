import { IUserProfile } from '../../types/types';

export interface SearchBlockProps {
  closeSearchBlock: (event: Event) => void;
  showSearch: boolean;
}

export interface SearchResultProps {
  users: IUserProfile[];
  searchValue: string;
}
