import React, { useEffect, useReducer, useState } from 'react';
import UserHeader from '../userHeader/user-header';
import { IUser, IUserProfile } from '../../types/types';
import { getUserByUsername } from '../../firebase/services';

export default function UserProfile({ user }: { user: IUserProfile | null }) {
  const reducer = (
    state: typeof initialState,
    newState: typeof initialState
  ) => ({ ...state, ...newState });
  const initialState = {
    profile: {} as IUserProfile,
    followingsCount: 0,
    followersCount: 0,
    followers: [] as string[],
    following: [] as string[]
  };
  const [{ profile, followersCount, followingsCount, followers, following }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const{following, followers} = user as IUser;
  console.log(following, followers);
  

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      if (user) {
        // const photos = await getUserByUsername(user?.username);
        dispatch({
          profile: user,
          followersCount: user.followers.length,
          followingsCount: user.following.length,
          followers: user.followers,
          following: user.following
        });
      }
    }
    getProfileInfoAndPhotos();
  }, [user?.username]);

  return (
    <div>
      {
        <UserHeader
          user={profile}
          followersCount={followersCount}
          followingsCount={followingsCount}
        />
      }
      
    </div>
  );
}
