import React, { createContext, useContext, useState } from 'react';
import { IComment, IPhotoDoc } from '../../types/types';
import { IPostContext, ProviderProps } from './types';

const PostContext = createContext<IPostContext>({
  comments: [],
  loading: false,
  setNewComment: () => {},
  loadingOn: () => {},
  loadingOf: () => {},
});

const PostProvider = ({ children }: ProviderProps) => {
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
    <PostContext.Provider
      value={{ comments, setNewComment, loadingOn, loadingOf, loading }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePost = () => useContext(PostContext);

export { PostProvider, usePost };
