import React, {
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { IUserProfile, IPhotoDoc, IComment } from '../../types/types';
import PostHeader from './post-header';
import Like from './like';
import { getRelativeTimeString } from '../../helpers/helpers';
import Comments from './comments-list';
import { useOnClickOutside } from '../../helpers/useOnClickOutside';
import CommentForm from './comment-form';

type ModalPropsType = {
  user: IUserProfile | null;
  photo: IPhotoDoc;
  closeModal: () => void;
  commentsArr: IComment[];
};

function ModalPost({ user, photo, closeModal, commentsArr }: ModalPropsType) {
  const { caption, dateCreated, docId, imageSrc, likes } = photo;
  const date = getRelativeTimeString(dateCreated, 'en');
  const menuRef = useRef<HTMLDivElement>(null);

  const [comments, setComments] = useState(commentsArr);

  useEffect(() => {
    setComments(commentsArr);
  }, [commentsArr]);

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
            {user ? <PostHeader user={user} /> : null}

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

              <Comments comments={comments} />

              <div>
                <div style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <Like likes={likes} docId={docId} />
                <div>{date}</div>
                </div>
                
                <CommentForm
                  setCommentsArr={setComments}
                  comments={comments}
                  docId={docId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPost;
