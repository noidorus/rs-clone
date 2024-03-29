import React from 'react';

import { getUserDataHook } from '../../../hooks/getUserHook';
import { IComment } from '../../../types/types';
import { useAppSelector } from '../../../hooks/redux.hook';
import { PrettyDate } from '../date/Date';
import { usePost } from '../../providers/PostProvider';

interface CommentProps {
  commentData: IComment;
  photoUserId: string;
}

const CommentItem = ({ commentData, photoUserId }: CommentProps) => {
  const { userId, comment, date } = commentData;
  const { user } = getUserDataHook(userId);
  const { loggedUser } = useAppSelector(({ userCenter }) => userCenter);

  const { onDeleteComment } = usePost();

  const checkCanDelete = () => {
    if (photoUserId == loggedUser?.userId) {
      return true;
    } else if (userId == loggedUser?.userId) {
      return true;
    } else {
      return false;
    }
  };

  const canDelete = checkCanDelete();

  const handleDeleteComment = async (): Promise<void> => {
    onDeleteComment(date);
  };

  return (
    <li className="comments-list__item comment">
      <div className="comment__inner">
        <p className="comment__message">
          {user && <span>{user.username}</span>}
          {comment}
        </p>
        <PrettyDate date={date} type="comment" />
      </div>
      <div className="comment__action">
        {canDelete && (
          <button
            className="comment__delete button button--delete"
            onClick={handleDeleteComment}
          ></button>
        )}
      </div>
    </li>
  );
};

export default CommentItem;
