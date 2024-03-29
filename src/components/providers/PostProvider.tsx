import React, { createContext, useContext, useState } from 'react';
import {
  deleteComment,
  updateComments,
  updateLikes,
} from '../../firebase/services';
import { useAppSelector } from '../../hooks/redux.hook';
import { IComment, IPhotoDoc } from '../../types/types';
import { ModalLayout } from '../modalLayout';
import { IPostContext, ProviderProps } from './types';

const PostContext = createContext<IPostContext>({
  comments: [],
  loading: false,
  modal: null,
  likes: [],
  onDeleteComment: async () => true,
  setNewComment: () => {},
  setModal: () => {},
  setLoading: () => {},
  toggleLike: () => {},
});

const PostProvider = ({ children }: ProviderProps) => {
  const { photo }: { photo: IPhotoDoc } = children.props;
  const { loggedUser } = useAppSelector(({ userCenter }) => userCenter);
  const [comments, setComments] = useState(photo.comments);
  const [likes, setLikes] = useState(photo.likes);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<JSX.Element | null>(null);

  const toggleLike = async (isLikedPhoto: boolean) => {
    if (loggedUser) {
      const newLikes = await updateLikes(
        isLikedPhoto,
        photo.docId,
        loggedUser?.userId
      );

      setLikes(newLikes);
    }
  };

  const setNewComment = async (newComment: string) => {
    if (loggedUser) {
      const commentData = {
        comment: newComment,
        date: Date.now(),
        userId: loggedUser.userId,
      };

      setLoading(true);
      const updatedComments = await updateComments(commentData, photo.docId);
      setComments(updatedComments);
      setLoading(false);
    }
  };

  const onDeleteComment = async (date: number) => {
    if (loggedUser) {
      const updatedComments = await deleteComment(date, photo.docId);
      setComments(updatedComments);
      return;
    }
  };

  return (
    <PostContext.Provider
      value={{
        comments,
        loading,
        modal,
        likes,
        setNewComment,
        setLoading,
        setModal,
        onDeleteComment,
        toggleLike,
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
