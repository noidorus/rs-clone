import React, { useState } from 'react';
import { IPhoto, IPhotoDoc, IUserProfile } from '../../types/types';
import PreviewUser from '../foundUser/foundUsers';
import { getRelativeTimeString } from '../../helpers/helpers';
import Like from './like';

// function Post({ photo, user }: { photo: IPhotoDoc; user: IUserProfile }) {
function Post({ photo, user }: { photo: IPhotoDoc; user: IUserProfile }) {
  const date = getRelativeTimeString(photo.dateCreated, 'en');
  

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

      <Like photo={photo} />

      <div>{photo.caption}</div>
      <div>{date}</div>
      <div>
        {/* {photo.comments.length !==0 && (<span>{photo.comments[0].comment}</span>)} */}
        <span>Комментарий</span>
        <span>Комментарий</span>
      </div>
      <div>
        <input placeholder="Add a comment" />
        <button>Post</button>
      </div>
    </div>
  );
}

export default Post;
