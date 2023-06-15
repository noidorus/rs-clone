import React, { useState } from 'react';

import { getUserDataHook } from '../../../hooks/getLoggedUserData';
import { IComment } from '../../../types/types';
import { deleteComment } from '../../../firebase/services';
import { useAppSelector } from '../../../hooks/redux.hook';
import { PrettyDate } from '../date/Date';
import { usePost } from '../../providers/PostProvider';

interface CommentProps {
  commentData: IComment;
  photoDocId: string;
  photoUserId: string;
}

const CommentItem = ({
  commentData,
  photoDocId,
  photoUserId,
}: CommentProps) => {
  const { userId, comment, date } = commentData;
  const commentUser = getUserDataHook(userId);
  const { loggedUser } = useAppSelector(({ userInfo }) => userInfo);

  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const loadingEnd = await onDeleteComment(date);

    if (loadingEnd) {
      setLoading(false);
    }
  };

  return (
    <li className="comments-list__item comment">
      <div className="comment__inner">
        <div className="comment__message">
          {commentUser && (
            <span className="comment__user">{commentUser.username}</span>
          )}
          <span className="comment__text">{comment}</span>
        </div>
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
