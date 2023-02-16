import React from 'react';
import { IPhoto, IUserProfile } from '../../types/types';
import PreviewUser from '../foundUser/foundUsers';

function Post({ photo, user }: { photo: IPhoto; user: IUserProfile }) {
  function getRelativeTimeString(date: number, lang = navigator.language) {
    const deltaSeconds = Math.round((date - Date.now()) / 1000);
    if (Math.abs(deltaSeconds) > 3600 * 24 * 3) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } else {
      const cutoffs = [60, 3600, 3600 * 24, 3600 * 24 * 7];
      const units: Intl.RelativeTimeFormatUnit[] = [
        'second',
        'minute',
        'hour',
        'day',
      ];
      const unitIndex = cutoffs.findIndex(
        (cutoff) => cutoff > Math.abs(deltaSeconds)
      );
      const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;
      const rtf = new Intl.RelativeTimeFormat('en', {});
      return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
    }
  }

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
      <div
        style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            background: 'url("./images/icons/notifications.svg") no-repeat',
            width: '26px',
            height: '26px',
          }}
        ></div>
        <div>
          {photo.likes.length !== 0 && (
            <span>
              {photo.likes.length} {photo.likes.length === 1 ? 'like' : 'likes'}
            </span>
          )}
        </div>
      </div>
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
