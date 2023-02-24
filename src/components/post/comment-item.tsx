import React, { useContext, useEffect, useState } from 'react';
import { getUserDataHook } from '../../hooks/getLoggedUserData';
import { getRelativeTimeString } from '../../helpers/helpers';
import { IComment, IUserProfile } from '../../types/types';
import UserContext from '../../context/user-context';
import { deleteComment } from '../../firebase/services';
import CommentsContext from '../../context/comments-context';

interface CommentProps {
  commentData: IComment;
  photoDocId: string;
  photoUserId: string;
}

export default function CommentItem({
  commentData,
  photoDocId,
  photoUserId,
}: CommentProps) {
  const { userId, comment, date } = commentData;
  const prettyDate = getRelativeTimeString(date, 'en');
  const commentUser = getUserDataHook(userId);
  const loggedUser = useContext(UserContext).user;
  const [user, setUser] = useState<IUserProfile | null>(commentUser);
  const { setCommentsArr } = useContext(CommentsContext);

  const checkCanDelete = () => {
    if (photoUserId == loggedUser?.uid) {
      return true;
    } else if (userId == loggedUser?.uid) {
      return true;
    } else {
      return false;
    }
  };

  const canDelete = checkCanDelete();

  const handleDeleteComment = async () => {
    const newCommentsArr = await deleteComment(photoDocId, date);
    setCommentsArr(newCommentsArr);
  };

  useEffect(() => {
    setUser(commentUser);
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <p>{prettyDate}</p>
        {canDelete ? (
          <button className='button button--delete' onClick={handleDeleteComment}></button>
        ) : null}
      </div>
    </li>
  );
}
