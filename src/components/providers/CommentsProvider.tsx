import React, { createContext, useContext, useState } from 'react';
import { IComment, IPhotoDoc } from '../../types/types';
import { ICommentsContext, ProviderProps } from './types';

const CommentsContext = createContext<ICommentsContext>({
  comments: [],
  loading: false,
  setNewComment: () => {},
  loadingOn: () => {},
  loadingOf: () => {},
});

const CommentsProvider = ({ children }: ProviderProps) => {
  const { photo }: { photo: IPhotoDoc } = children.props;
  const [comments, setComments] = useState(photo.comments);
  const [loading, setLoading] = useState(false);

  const setNewComment = (newComment: IComment) => {};

  const loadingOn = () => {
    setLoading(true);
  };
  const loadingOf = () => {
    setLoading(false);
  };
  return (
    <CommentsContext.Provider
      value={{ comments, setNewComment, loadingOn, loadingOf, loading }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

const useComments = () => useContext(CommentsContext);

export { CommentsProvider, useComments };
