import React from 'react';
import { IUserProfile } from '../../types/types';

type PropsPreviewUser = {
  name: string;
  avatar: string;
}

export function PreviewUser(props: PropsPreviewUser) {
  return (
    <li style={{
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      gap: '20px',
      marginLeft: '20px'
    }}>
      <img className="user__image"
        src={props.avatar}
        width='44'
        height='44'
      />
      <div>{props.name}</div>
    </li>
  )
}
