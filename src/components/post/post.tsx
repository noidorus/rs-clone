import React, { useEffect, useState } from 'react';
import { IPhotoDoc } from '../../types/types';
import PreviewUser from '../foundUser/foundUsers';
import { getRelativeTimeString } from '../../helpers/helpers';
import Like from './like';
import Comments from './comments-list';
import { getUserDataHook } from '../../hooks/getLoggedUserData';
import Skeleton from 'react-loading-skeleton';


function Post({ photo }: { photo: IPhotoDoc }) {
  const date = getRelativeTimeString(photo.dateCreated, 'en');
  const { likes, docId, comments, userId } = photo;
  const currUser = getUserDataHook(userId);
  const [user, setUser] = useState(currUser);

  useEffect(() => {
    setUser(currUser);
  }, [currUser]);

  return (
    <div
      className="post-list__item"
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
    </div> || <Skeleton />
  );
}

export default Post;
