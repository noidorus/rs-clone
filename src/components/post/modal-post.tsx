import React, {
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useContext,
} from 'react';
import { IUserProfile, IPhotoDoc, IComment } from '../../types/types';
import PostHeader from './post-header';
import Like from './like';
import { getRelativeTimeString } from '../../helpers/helpers';
import Comments from './comments-list';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import CommentForm from './comment-form';
import CommentsContext from '../../context/comments-context';

type ModalPropsType = {
  user: IUserProfile | null;
  photo: IPhotoDoc;
  closeModal: () => void;
};

function ModalPost({ user, photo, closeModal }: ModalPropsType) {
  const { caption, dateCreated, docId, imageSrc, likes, userId } = photo;
  const date = getRelativeTimeString(dateCreated, 'en');
  const menuRef = useRef<HTMLDivElement>(null);

  const { commentsArr } = useContext(CommentsContext);

  useOnClickOutside(menuRef, closeModal);

  return (
    <div
      style={{
        width: '100%',
        margin: '0 5%',
      }}
    >
      <div className="modal">
        <div
          ref={menuRef}
          style={{
            display: 'flex',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div
            style={{
              height: '100%',
              maxWidth: '50%',
              flexShrink: 0,
              margin: '2%',
            }}
          >
            <img
              src={imageSrc}
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {user ? <PostHeader photoData={photo} user={user} closeModal={closeModal} /> : null}

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                margin: '1% 4%',
                rowGap: '10px',
              }}
            >
              <div>{caption}</div>

              <Comments comments={commentsArr} photoDocId={docId} photoUserId={userId} />

              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Like likes={likes} docId={docId} />
                  <div>{date}</div>
                </div>

                <CommentForm docId={docId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPost;
