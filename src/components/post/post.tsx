import React, { useEffect, useState } from 'react';
import { IPhoto, IPhotoDoc, IUserProfile } from '../../types/types';
import { getUserDataHook } from '../../hooks/getLoggedUserData';
import ModalPost from './modal-post';
import Like from './like';
import './post.scss';
import Comments from './comments-list';
import PreviewUser from '../foundUser/foundUsers';
import { getRelativeTimeString } from '../../helpers/helpers';

function Post({ photo }: { photo: IPhotoDoc }) {
  const { likes, docId, dateCreated, comments, userId } = photo;
  const date = getRelativeTimeString(dateCreated, 'en');
  const currUser = getUserDataHook(userId);
  
  const [user, setUser] = useState(currUser);
  const [isOpenModal, setIsOpenModal] = useState(false);

  function showModal(): void {
    setIsOpenModal(true);
  }

  function closeModal(): void {
    setIsOpenModal(false);
  }

  useEffect(() => {
    setUser(currUser);
  }, [currUser]);

  if (location.pathname === '/') {
    return (
      <div className='post-list__item'
        style={{
          maxWidth: '32%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {user ? <PreviewUser user={user} /> : null}
          <div
            style={{
              fontSize: '50px',
              alignSelf: 'flex-start',
              lineHeight: '17px',
            }}
          >
            ...
          </div>
        </div>

        <div>
          <img
            src={photo.imageSrc}
            style={{
              width: 293,
              height: 293,
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Like likes={likes} docId={docId} />
          <div>{date}</div>
        </div>

        <div>{photo.caption}</div>

        <Comments comments={comments} docId={docId} />
      </div>
    )
  } else {
    return (
      <div className='post-list__item'
        style={{
          maxWidth: '32%',
        }}
        onClick={() => showModal()}>
        <div className='post__image'>
          <img
            src={photo.imageSrc}
          />
          <div className='post__preview'>
            {(<>
              <div className='post-preview__likes'></div>
              {likes.length !== 0 && (<div className='post-preview__text'>{likes.length}</div>)}
              <div className='post-preview__comments'></div>
              {comments.length !== 0 && (<div className='post-preview__text'>{comments.length}</div>)}
            </>)}
          </div>
        </div>
        {isOpenModal && <ModalPost
          user={user}
          photo={photo}
          closeModal={closeModal}
        />}
      </div>
    );
  }


}

export default Post;
