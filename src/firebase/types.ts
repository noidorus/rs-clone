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
