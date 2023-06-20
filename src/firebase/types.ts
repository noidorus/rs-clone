export interface CreateUserProps {
  username: string;
  fullName: string;
  email: string;
  password: string;
}

export interface UpdateAvatarProps {
  img: File;
  docId: string;
  oldAvatarPath?: string;
}

export interface ToggleFollowProps {
  isFollowingProfile: boolean;
  userId: string;
  docId: string;
  loggedUserId: string;
  loggedDocId: string;
}
