import React, { createContext, useContext, useState } from 'react';
import { IComment, IPhotoDoc } from '../../types/types';
import { ICommentsContext, ProviderProps } from './types';

const CommentsContext = createContext<ICommentsContext>({
  comments: [],
  setNewComment: () => {},
});

const CommentsProvider = ({ children }: ProviderProps) => {
  const { photo }: { photo: IPhotoDoc } = children.props;
  const [comments, setComments] = useState(photo.comments);

  const setNewComment = (newComment: IComment) => {};

  return (
    <CommentsContext.Provider value={{ comments, setNewComment }}>
      {children}
    </CommentsContext.Provider>
  );
};

const useComments = () => useContext(CommentsContext);

export { CommentsProvider, useComments };
