import React, { useEffect, useState } from 'react';
import { IUserProfile } from '../types/types';
import { getUserByUserId } from '../firebase/services';

export const getUserDataHook = (userId: string | undefined) => {
  const [activeUser, setActiveUser] = useState<IUserProfile | null>(null);

  useEffect(() => {
    const getUserData = async (userId: string) => {
      const user = await getUserByUserId(userId);
      setActiveUser(user);
    };

    if (userId) {
      getUserData(userId);
    }
  }, [userId]);

  return activeUser;
};
