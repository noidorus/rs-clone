import React, { createContext, useContext, useState } from 'react';
import { updateComments } from '../../firebase/services';
import { useAppSelector } from '../../hooks/redux.hook';
import { IComment, IPhotoDoc } from '../../types/types';
import { ModalLayout } from '../modalLayout';
import { IPostContext, ProviderProps } from './types';

const PostContext = createContext<IPostContext>({
  comments: [],
  loading: false,
  modal: null,
  setModal: () => {},
  setNewComment: () => {},
  setLoading: () => {},
});

const PostProvider = ({ children }: ProviderProps) => {
  const { photo }: { photo: IPhotoDoc } = children.props;
  const [comments, setComments] = useState(photo.comments);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<JSX.Element | null>(null);
  const { loggedUser } = useAppSelector(({ userInfo }) => userInfo);

  const setNewComment = async (newComment: string) => {
    if (loggedUser) {
      const commentData = {
        comment: newComment,
        date: Date.now(),
        userId: loggedUser.userId,
      };
      const updatedComments = await updateComments(commentData, photo.docId);

      setComments(updatedComments);
    }
  };

  return (
    <PostContext.Provider
      value={{
        comments,
        loading,
        modal,
        setNewComment,
        setLoading,
        setModal,
        // photo,
      }}
    >
      {children}
      {modal && (
        <ModalLayout closeModal={() => setModal(null)}>{modal}</ModalLayout>
      )}
    </PostContext.Provider>
  );
};

const usePost = () => useContext(PostContext);

export { PostProvider, usePost };
