import { IUser, MyError } from '../types/types';
import {
  collection,
  query,
  where,
  getDocs,
  Firestore,
  CollectionReference,
  DocumentData,
  doc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function doesUsernameExist(username: string) {
  const userColection = collection(db, 'users');

  const userQuery = query(userColection, where('username', '==', username));
  const querySnapshot = await getDocs(userQuery);

  return querySnapshot.docs.length > 0;
}

export async function setUserData(user: IUser) {
  const userColl = createCollection('users', db);
  const userRef = doc(userColl);
  setDoc(userRef, user);
}

export const createCollection = <T = DocumentData>(
  collectionName: string,
  db: Firestore
) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

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
