import React, { useEffect, useReducer, useState } from 'react';
import UserHeader from './user-header';
import { IUserProfile, IPhoto } from '../../types/types';
import { setDataPhotos } from '../../firebase/services';
import Post from '../post/post';

interface IState {
  profile: IUserProfile;
  followersCount: number;
}

function getPhotosByUser(photos: IPhoto[], id: string) {
  return photos
    .filter((photo) => photo.userId === id)
    .sort((a, b) => b.dateCreated - a.dateCreated);
}

export default function UserProfile({ user }: { user: IUserProfile | null }) {
  const [photos, setPhoto] = useState<IPhoto[]>([]);
  const [photosVisible, setPhotoVisible] = useState<IPhoto[]>([]);

  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    if (user) {
      setPhotoVisible(getPhotosByUser(photos, user.userId));
    } else {
      setPhotoVisible([]);
    }
  }, [photos]);

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      if (user) {
        setProfile(user);
        setFollowersCount(user.followers.length);
        setDataPhotos()
          .then((data) => {
            setPhoto(data as IPhoto[]);
          })
          .catch((err) => {
            setPhoto([]);
          });
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

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {profile
          ? photosVisible.map((photo, index) => {
              return (
                <div key={index}>
                  <Post photo={photo} user={profile} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
