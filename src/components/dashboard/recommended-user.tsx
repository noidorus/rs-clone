import React, { useState } from 'react'
import { toggleFollow } from '../../firebase/services'
import { IUserProfile } from '../../types/types'
import { PreviewUser } from '../userProfile/preview-user'
import { Modal } from './modal'

type PropsRecommendedUser = {
  user: IUserProfile,
  loggedUser: IUserProfile
}

export function RecommendedUser(props: PropsRecommendedUser) {
  const user = props.user;
  const loggedUser = props.loggedUser;
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  function addFollow() {
    if(!isFollowingProfile){
      toggleFollow(isFollowingProfile, user.userId, user.docId, loggedUser.userId, loggedUser.docId);
      setIsFollowingProfile(true)
    } else {
      setIsOpenModal(true);
    }
  }

  function closeModal() {
    setIsOpenModal(false)
  }

  return (
    <div style={{
      display: 'flex',
      width: 350,
      justifyContent: 'space-between'
    }}>
      <PreviewUser
        name={user.username}
        avatar={user.avatarData?.avatarSrc || './images/icons/profile.jpg'}
      />
      <button style={{
        color: '#0095F6',
        border: 'none',
        background: 'rgba(0, 0, 0, 0)',
        padding: 0,
      }} className='button' onClick={() => addFollow()}>
        {isFollowingProfile ? 'Unfollow' : 'Follow'}
      </button>
      {isOpenModal && <Modal
        user={user}
        closeModal={closeModal}
        loggedUser={loggedUser}
        setIsFollowingProfile={setIsFollowingProfile}
      />}
    </div>
  )
}