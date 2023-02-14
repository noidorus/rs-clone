import React from "react";
import {IUser} from '../../types/types'

function FoundUser({user}: {user: IUser}) {
  const {username, fullName, avatarData} = user;
  const src = avatarData?.avatarSrc || './images/icons/profile.jpg';

  return (
    <li style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: 0,
            margin: '10px 0',
          }}
          >
      <img src={src} width='53' height='53'/>
      <span>{username}</span>
      <span>({fullName})</span>
    </li>
  )
}

export default FoundUser;