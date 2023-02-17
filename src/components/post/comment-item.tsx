import React, { useEffect, useState } from 'react';
import { getUserDataHook } from '../../hooks/getLoggedUserData';
import { getRelativeTimeString } from '../../helpers/helpers';
import { IComment, IUserProfile } from '../../types/types';

interface CommentProps {
  commentData: IComment;
}

export default function CommentItem({ commentData }: CommentProps) {
  const { userId, comment, date } = commentData;
  const prettyDate = getRelativeTimeString(date, 'en');
  const commentUser = getUserDataHook(userId);
  const [user, setUSer] = useState<IUserProfile | null>(null);

  useEffect(() => {
    setUSer(commentUser);
  }, [commentUser]);

  return (
    <li>
      {user ? (
        <span
          style={{
            marginRight: '10px',
          }}
        >
          {user.username}
        </span>
      ) : null}
      <span>{comment}</span>
      <p>{prettyDate}</p>
    </li>
  );
}
