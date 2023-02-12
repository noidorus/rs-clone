import { IUser, MyError } from '../types/types';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from 'firebase/firestore';
import { db } from './lib';

export async function doesUsernameExist(username: string) {
  const querySnapshot = await getQuerySnapshot(username, 'users');
  return querySnapshot.docs.length > 0;
}

export async function getQuerySnapshot(username: string, collName: string) {
  const userColection = collection(db, collName);
  const userQuery = query(userColection, where('username', '==', username));

  return await getDocs(userQuery);
}

export async function getUserByUsername(username: string) {
  const querySnapshot = await getQuerySnapshot(username, 'users');

  return querySnapshot.docs.map((item) => {
    const itemData = item.data() as IUser;
    return {
      ...itemData,
      docId: item.id,
    };
  });
}

export async function setUserData(user: IUser) {
  const userColl = collection(db, 'users');
  const userRef = doc(userColl);

  setDoc(userRef, user);
}

export function getError(error: MyError) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'The email address is already in use';
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed.';
    case 'auth/weak-password':
      return 'The password is too weak.';
    default:
      return error.message;
  }
}

export function setPhotoData(
  photoId: string,
  path: string,
  userId: string,
  caption: string
) {
  const photoColl = collection(db, 'photos');
  const photoRef = doc(photoColl);

  const imageData = {
    caption: caption,
    comments: [],
    dateCreated: Date.now(),
    imageSrc: path,
    likes: [],
    photoId: photoId,
    userId: userId,
  };

  setDoc(photoRef, imageData);
}