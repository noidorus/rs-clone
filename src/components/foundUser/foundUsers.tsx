import React from "react";
import {IUser} from '../../types/types'

function FoundUser(props: Partial<IUser>) {
  return (
    <li style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: 0,
            margin: '10px 0',
          }}
          >
      <img src='https://rolling-scopes-school.github.io/szyrwel-JSFE2022Q3/online-zoo/assets/images/testimonials/user_icon.png' />
      <span>{props.username}</span>
      <span>({props.fullName})</span>
    </li>
  )
}

export default FoundUser;