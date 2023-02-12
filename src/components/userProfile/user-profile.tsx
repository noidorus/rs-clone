import React from 'react';
import UserHeader from '../userHeader/user-header';
import { IUserProfile } from '../../types/types';

export default function UserProfile({ user }: { user: IUserProfile | null }) {
  
  
  
  return (
    <div>
      <UserHeader />
    </div>
  );
}
