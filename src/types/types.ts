export interface IUser {
  userId: string;
  username: string;
  fullName: string;
  emailAddress: string;
  following: string[];
  followers: string[];
  dateCreated: number;
}

export interface MyError {
  code: string;
  message: string;
}
