export interface IUser {
  userId: string;
  username: string;
  fullName: string;
  emailAddress: string;
  following: string[];
  followers: string[];
  dateCreated: number;
  avatarData: {
    avatarSrc: string;
    imagePath: string;
  };
}

export interface IUserProfile extends IUser {
  docId: string;
}

export interface MyError {
  code: string;
  message: string;
}

export interface IComment {
  comment: string;
  displayName: string;
  commentDate: number;
}

export interface IPhoto {
  caption: string;
  comments: IComment[];
  dateCreated: number;
  imageSrc: string;
  likes: string[];
  photoId: string;
  userId: string;
}
