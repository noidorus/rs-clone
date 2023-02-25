import React from 'react';
import { Link } from 'react-router-dom';

type PropsPreviewUser = {
  name: string;
  avatar: string;
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
        >
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
