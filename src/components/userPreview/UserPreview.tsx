import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

type PropsPreviewUser = {
  name: string;
  avatar: string | undefined;
};

export const UserPreview = ({ name, avatar }: PropsPreviewUser) => {
  return (
    <Link className="recomendations__user recomendations-user" to={`/${name}`}>
      <div className="recomendations-user__image-wrapper">
        <img
          className="recomendations-user__image"
          src={avatar || './images/icons/profile.jpg'}
          width="56"
          height="56"
        />
      </div>
      <span className="recomendations-user__name">{name}</span>
    </Link>
  );
};
