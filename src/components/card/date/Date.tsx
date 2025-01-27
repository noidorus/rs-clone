import React from 'react';
import { getRelativeTimeString } from '../../../helpers/helpers';

import './index.scss';

interface Props {
  date: number;
  type?: 'comment' | 'photo';
}

const PrettyDate = ({ date, type = 'photo' }: Props) => {
  const relativeDate = getRelativeTimeString(date, 'en');

  return (
    <div className={type === 'photo' ? 'post__date' : 'comment__date'}>
      {relativeDate}
    </div>
  );
};

export { PrettyDate };
