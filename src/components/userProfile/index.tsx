import React, { useEffect, useReducer, useState } from 'react';
import UserHeader from './user-header';
import { IUserProfile, IPhoto } from '../../types/types';
import { setDataPhotos } from '../../firebase/services';
import Post from '../post/post';


function getPhotosByUser(photos: IPhoto[], id: string) {
  return photos.filter(photo => photo.userId === id)
               .sort((a, b) => b.dateCreated - a.dateCreated);
}

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
  const [photos, setPhoto] = useState<IPhoto[]>([]);
  const [photosVisible, setPhotoVisible] = useState<IPhoto[]>([]);

  useEffect(() => {
    setDataPhotos()
      .then((data) => {
        setPhoto(data as IPhoto[]);
      })
      .catch((err) => {
        setPhoto([])
      })
  }, [])

  useEffect(()=> {
    if(user) {
      setPhotoVisible((getPhotosByUser(photos, user.userId)))
    } else {
      setPhotoVisible([])
    }
  }, [photos])

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
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {photosVisible.map((photo, index) => {
          return (
            <div key={photo.photoId}>
              <Post
                photo={photo}
                user={profile}
              />
            </div>
          )
        })
      }
      </div>
      
    </div>
  );
}
