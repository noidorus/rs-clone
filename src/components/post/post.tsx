import React, { useState } from 'react';
import { IPhoto, IPhotoDoc, IUserProfile } from '../../types/types';
import PreviewUser from '../foundUser/foundUsers';
import { getRelativeTimeString } from '../../helpers/helpers';
import Like from './like';
import Comments from './comments-list';

function Post({ photo, user }: { photo: IPhotoDoc; user: IUserProfile }) {
  const date = getRelativeTimeString(photo.dateCreated, 'en');
  const { likes, docId, comments } = photo;

  return (
    <div
      style={{
        maxWidth: '33%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <PreviewUser user={user} />
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
  );
}

export default Post;
