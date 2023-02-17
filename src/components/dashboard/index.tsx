import { async } from '@firebase/util';
import { User } from 'firebase/auth';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getPhotosByUserId } from '../../firebase/services';
import { getUserDataHook } from '../../hooks/getLoggedUserData';
import { IPhotoDoc } from '../../types/types';
import Timeline from '../timeline';

interface MainPageProps {
  photos: IPhotoDoc[];
  setPhotos: Dispatch<SetStateAction<IPhotoDoc[]>>;
  user: User;
}

export default function MainPage({ photos, setPhotos, user }: MainPageProps) {
  const userData = getUserDataHook(user.uid);

  useEffect(() => {
    async function getPhotos() {
      if (userData) {
        const usersIds = [...userData.following, userData.userId];
        const photos: IPhotoDoc[] = [];

        for (let i = 0; i < usersIds.length; i += 1) {
          const arr = await getPhotosByUserId(usersIds[i]);
          photos.push(...arr);
        }

        const sortedPhotos = photos.sort(
          (a, b) => b.dateCreated - a.dateCreated
        );
        setPhotos(sortedPhotos);
      }
    }

    getPhotos();
  }, [userData]);

  return (
    <div>
      <Timeline photosData={photos} />
    </div>
  );
}
