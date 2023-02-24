import React, { useEffect, useState } from 'react';
import { setDataUsers } from '../../firebase/services';
import { IUserProfile } from '../../types/types';
import { PreviewUser } from '../userProfile/preview-user';

type PropsRecomendations = {
  userData: IUserProfile;
}

export function Recomendation(props: PropsRecomendations) {
  if (!props.userData) null;

  const [users, setUsers] = useState<IUserProfile[]>([]);
  // const [usersForDraw, setUsersForDraw] = useState<IUserProfile[]>([]);

  useEffect(() => {
    setDataUsers().
      then((data) => {
        data = data.filter(el => !props.userData.following.includes(el.userId) && el.userId !== props.userData.userId)
        setUsers(data);
      })
  }, []);

  // useEffect(() => {
  // }, [users]);


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      marginTop: '50px'
    }}>
      <PreviewUser
        name={props.userData.username}
        avatar={props.userData.avatarData?.avatarSrc || './images/icons/profile.jpg'}
      />
      <h3>Suggestions for you:</h3>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 15
      }}>
        {users.map(user => {
          return (
            <PreviewUser
              name={user.username}
              avatar={user.avatarData?.avatarSrc || './images/icons/profile.jpg'}
            />
          )
        })}
      </div>
    </div>
  )
}