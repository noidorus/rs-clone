import React, { useEffect, useReducer, useState } from 'react';
import UserHeader from './user-header';
import Timeline from './timeline';
import { IUserProfile, IPhoto, IPhotoDoc } from '../../types/types';
import { getPhotosByUserId } from '../../firebase/services';


export default function UserProfile({ user }: { user: IUserProfile | null }) {
  const [photos, setPhoto] = useState<IPhotoDoc[]>([]);
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      if (user) {
        const photos = await getPhotosByUserId(user.userId)
        setProfile(user);
        setFollowersCount(user.followers.length);
        setPhoto(photos);
      }
    }

    getProfileInfoAndPhotos();
  }, [user?.username]);

  return (
    <div>
      {profile ? (
        <UserHeader
          user={profile}
          followersCount={followersCount}
          setFollowersCount={setFollowersCount}
        />
      ) : null}

      {profile ? <Timeline photosData={photos} user={profile} /> : null}
    </div>
  );
}
