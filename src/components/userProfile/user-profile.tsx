import React, { useEffect, useReducer } from 'react';
import UserHeader from '../userHeader/user-header';
import { IUserProfile } from '../../types/types';
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
  };

  const [{ profile, followersCount, followingsCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      if (user) {
        // const photos = await getUserByUsername(user?.username);
        dispatch({
          profile: user,
          followersCount: user.followers.length,
          followingsCount: user.following.length,
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
