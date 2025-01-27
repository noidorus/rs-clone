import React, { useEffect, useState } from 'react';
import { IUserProfile } from '../types/types';
import { getUserByUserId } from '../firebase/services';

export const getUserDataHook = (userId: string) => {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    const getUserData = async (userId: string) => {
      setUserLoading(true);
      const user = await getUserByUserId(userId);
      setUserLoading(false);
      setUser(user);
    };

    getUserData(userId);
  }, [userId]);

  return { user, userLoading };
};
