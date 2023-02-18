import React, { useEffect, useState } from 'react';
import { IPhoto, IPhotoDoc, IUserProfile } from '../../types/types';
import { getUserDataHook } from '../../hooks/getLoggedUserData';
import ModalPost from './modal-post';
import Like from './like';
import './post.scss';

function Post({ photo }: { photo: IPhotoDoc }) {
  const { likes, docId, comments, userId } = photo;
  const currUser = getUserDataHook(userId);
  console.log(currUser);
  
  const [user, setUser] = useState(currUser);
  const [isOpenModal, setIsOpenModal] = useState(false);

  function showModal(isOpenModal: boolean): void {
    setIsOpenModal(true);
  }
  function closeModal(isOpenModal: boolean): void {
    setIsOpenModal(false);
  }

  useEffect(() => {
    setUser(currUser);
  }, [currUser]);

  return (
    <div className='post-list__item'
      style={{
        maxWidth: '32%',
      }}
    onClick={() => showModal(isOpenModal)}>
      <div className='post__image'>
        <img 
          src={photo.imageSrc}
        />
      <div className='post__preview'>
        {(<>
        <div className='post-preview__likes'></div>
        {likes.length !==0 && (<div className='post-preview__text'>{likes.length}</div>)}
        <div className='post-preview__comments'></div>
        {comments.length !==0 && (<div className='post-preview__text'>{comments.length}</div>)}
        </>)}
      </div>
      </div>
      {isOpenModal && <ModalPost 
        user={user}
        photo={photo}
        />}
    </div>
  );

}

export default Post;
