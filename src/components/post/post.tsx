import React, { useEffect, useState } from 'react';
import ModalPost from './modal-post';
import './post.scss';
import { IComment, IPhotoDoc } from '../../types/types';
import PostHeader from './post-header';
import { getRelativeTimeString } from '../../helpers/helpers';
import Like from './like';
import Comments from './comments-list';
import { getUserDataHook } from '../../hooks/getLoggedUserData';
import Skeleton from 'react-loading-skeleton';
import CommentForm from './comment-form';

function Post({ photo }: { photo: IPhotoDoc }) {
  const { likes, docId, dateCreated, comments, userId } = photo;
  const date = getRelativeTimeString(dateCreated, 'en');
  const currUser = getUserDataHook(userId);

  const [user, setUser] = useState(currUser);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [commentsArr, setCommentsArr] = useState(comments);

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
      (
        <div
          className="post-list__item"
          style={{
            maxWidth: '32%',
          }}
        >
          {user ? <PostHeader user={user} /> : null}

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

          <Comments comments={commentsArr} />

          {commentsArr.length > 2 ? (
            <p
              style={{
                cursor: 'pointer',
                color: 'blue',
              }}
              onClick={showModal}
            >
              Show more comments...
            </p>
          ) : null}

          <CommentForm
            comments={commentsArr}
            docId={docId}
            setCommentsArr={setCommentsArr}
          />

          {isOpenModal && (
            <ModalPost
              user={user}
              commentsArr={comments}
              photo={photo}
              closeModal={closeModal}
            />
          )}
        </div>
      ) || <Skeleton />
    );
  } else {
    return (
      (
        <div
          className="post-list__item"
          style={{
            maxWidth: '32%',
          }}
          onClick={() => showModal()}
        >
          <div className="post__image">
            <img src={photo.imageSrc} />
            <div className="post__preview">
              {
                <>
                  <div className="post-preview__likes"></div>
                  {likes.length !== 0 && (
                    <div className="post-preview__text">{likes.length}</div>
                  )}
                  <div className="post-preview__comments"></div>
                  {comments.length !== 0 && (
                    <div className="post-preview__text">{comments.length}</div>
                  )}
                </>
              }
            </div>
          </div>
          {isOpenModal && (
            <ModalPost
              user={user}
              commentsArr={comments}
              photo={photo}
              closeModal={closeModal}
            />
          )}
        </div>
      ) || <Skeleton />
    );
  }
}

export default Post;
