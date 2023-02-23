import React from 'react';
import { Link } from 'react-router-dom';
import { IUserProfile } from '../../types/types';

type PropsPreviewUser = {
  name: string;
  avatar: string;
  closeModal: () => void
}
export function PreviewUser(props: PropsPreviewUser) {
  return (
    <>
      <Link className="user__link" to={`/${props.name}`}>
        <li style={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          gap: '20px',
          marginLeft: '20px'
        }}
          onClick={props.closeModal}>
          <img className="user__image"
            src={props.avatar}
            width='44'
            height='44'
          />
          <div>{props.name}</div>
        </li>
      </Link>
    </>
  )
}
